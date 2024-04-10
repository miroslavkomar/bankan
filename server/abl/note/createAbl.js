const Ajv = require("ajv");
const ajv = new Ajv();

const noteDao = require("../../dao/note-dao.js");
const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
    text: { type: "string", minLength: 5, maxLength: 2500 },
    taskId: { type: "string" },
  },
  required: ["text", "taskId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let note = req.body;

    // validate input
    const valid = ajv.validate(schema, note);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read task by given id
    const task = taskDao.get(note.taskId);
    if (!task) {
      res.status(404).json({
        code: "taskNotFound",
        note: `Task ${note.taskId} not found`,
      });
      return;
    }

    note.changeDate = new Date().toISOString();

    note = noteDao.create(note);
    res.json(note);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateAbl;
