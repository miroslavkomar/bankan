const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/note/listAbl");
const CreateAbl = require("../abl/note/createAbl");
const UpdateAbl = require("../abl/note/updateAbl");
const DeleteAbl = require("../abl/note/deleteAbl");

router.get("", (req, res) => {
  ListAbl(req, res);
});

router.post("", (req, res) => {
  CreateAbl(req, res);
});

router.put("", (req, res) => {
  UpdateAbl(req, res);
});

router.delete("/:id", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
