const noteDao = require("../../dao/note-dao.js");

async function DeleteAbl(req, res) {
  try {
    noteDao.remove(req.params?.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ note: e.note });
  }
}

module.exports = DeleteAbl;
