const Ajv = require("ajv");
const ajv = new Ajv();

const noteDao = require("../../dao/note-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string"},
    text: { type: "string", minLength: 5, maxLength: 2500 },
  },
  required: ["id", "text"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    note.changeDate = new Date().toISOString();
    const updatedNote = noteDao.update(note);

    if (!updatedNote) {
      res.status(404).json({
        code: "noteNotFound",
        note: `Note ${note.id} not found`,
      });
      return;
    }

    res.json(updatedNote);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = UpdateAbl;
