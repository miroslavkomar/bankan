const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");
const priorityDao = require("../../dao/priority-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 5, maxLength: 30},
    description: { type: "string", maxLength: 2500 },
    priorityId: {type: "string"},
    dueDate: { type: "string", format: "date"}
  },
  required: ["name", "priorityId", "dueDate"],
  additionalProperties: false,
};

const initialTaskStateId = "b1e62b2d3052cae99b203b134192a4e3";

async function CreateAbl(req, res) {
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

    if (task.dueDate < new Date().toISOString().split('T')[0]) {
      res.status(400).json({
        code: "dueDateLessThanCurrentDate",
        note: "Task Due Date cannot be less than current date"
      })
    }

    task.stateId = initialTaskStateId;

    res.json(taskDao.create(task));
  } catch (e) {
    console.log(e);
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateAbl;
