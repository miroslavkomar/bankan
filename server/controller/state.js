const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/state/listAbl");
const CreateAbl = require("../abl/state/createAbl");
const DeleteAbl = require("../abl/state/deleteAbl");

router.get("", (req, res) => {
  ListAbl(req, res);
});

router.post("", (req, res) => {
  CreateAbl(req, res);
});

router.delete("/:id", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
