const stateDao = require("../../dao/state-dao.js");

async function DeleteAbl(req, res) {
  try {
    const stateId = req.params?.id;
    stateDao.remove(stateId);
    res.json({});
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = DeleteAbl;
