const Ajv = require("ajv");
const ajv = new Ajv({useDefaults: true});
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");

const schema = {
  type: "object",
  properties: {
    dueDateFrom: { type: "string", format: "date", default: new Date().toISOString().split('T')[0]},
    dueDateTo: { type: "string", format: "date", default: new Date().toISOString().split('T')[0]}
  },
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    const taskList = taskDao.list(reqParams.dueDateFrom, reqParams.dueDateTo);
    res.json(taskList);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = ListAbl;
