const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/priority/listAbl");

router.get("", (req, res) => {
  ListAbl(req, res);
});

module.exports = router;
