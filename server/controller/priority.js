const express = require("express");
const router = express.Router();

const ListAbl = require("../abl/priority/listAbl");
const CreateAbl = require("../abl/priority/createAbl");
const DeleteAbl = require("../abl/priority/deleteAbl");


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
