const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const priorityDao = require("../../dao/priority-dao");
const stateDao = require("../../dao/state-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string", minLength: 5, maxLength: 30 },
    description: { type: "string", maxLength: 2500 },
    priorityId: {type: "string"},
    stateId: { type: "string"},
    dueDate: { type: "string", format: "date"}
  },
  required: ["id", "name", "priorityId", "dueDate"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const priority = priorityDao.get(task.priorityId);
    if (!priority) {
      res.status(404).json({
        code: "priorityNotFound",
        note: `Priority ${task.priorityId} not found`,
      });
      return;
    }

    const state = stateDao.get(task.stateId);
    if (!state) {
      res.status(404).json({
        code: "taskStateNotFound",
        note: `Task State ${task.stateId} not found`,
      });
      return;
    }

    if (task.dueDate < new Date().toISOString().split('T')[0]) {
      res.status(400).json({
        code: "dueDateLessThanCurrentDate",
        note: `Task Due Date cannot be less than current date`
      })
    }

    const updatedTask = taskDao.update(task);
    if (!updatedTask) {
      res.status(404).json({
        code: "taskNotFound",
        note: `Task ${task.id} not found`,
      });
      return;
    }
    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = UpdateAbl;
