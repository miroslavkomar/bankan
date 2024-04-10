const Ajv = require("ajv");
const ajv = new Ajv();

const priorityDao = require("../../dao/priority-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, maxLength: 10}
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let priority = req.body;

    // validate input
    const valid = ajv.validate(schema, priority);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        note: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    res.json(priorityDao.create(priority));
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = CreateAbl;
