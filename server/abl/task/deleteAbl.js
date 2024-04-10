const taskDao = require("../../dao/task-dao.js");

async function DeleteAbl(req, res) {
  try {
    taskDao.remove(req.params?.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = DeleteAbl;
