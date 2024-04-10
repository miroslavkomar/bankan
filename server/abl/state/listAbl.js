const stateDao = require("../../dao/state-dao.js");

async function ListAbl(req, res) {
  try {
    const stateList = stateDao.list();
    res.json(stateList);
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = ListAbl;
