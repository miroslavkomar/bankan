const priorityDao = require("../../dao/priority-dao.js");

async function ListAbl(req, res) {
  try {
    const priorityList = priorityDao.list();
    res.json(priorityList);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = ListAbl;
