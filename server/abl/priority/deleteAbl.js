const priorityDao = require("../../dao/priority-dao.js");

async function DeleteAbl(req, res) {
  try {
    const priorityId = req.params?.id;
    priorityDao.remove(priorityId);
    res.json({});
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = DeleteAbl;
