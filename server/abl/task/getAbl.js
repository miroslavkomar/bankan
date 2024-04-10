const taskDao = require("../../dao/task-dao.js");

async function GetAbl(req, res) {
  try {
    const taskId = req.params?.id;

    // read task by given id
    const task = taskDao.get(taskId);
    if (!task) {
      res.status(404).json({
        code: "taskNotFound",
        note: `Task ${taskId} not found`,
      });
      return;
    }
    res.json(task);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = GetAbl;
