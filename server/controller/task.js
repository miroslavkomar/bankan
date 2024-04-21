const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/task/listAbl");
const CreateAbl = require("../abl/task/createAbl");
const UpdateAbl = require("../abl/task/updateAbl");
const DeleteAbl = require("../abl/task/deleteAbl");


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
