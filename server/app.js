const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const taskController = require("./controller/task");
const priorityController = require("./controller/priority");
const stateController = require("./controller/state");
const noteController = require("./controller/note");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.use("/task", taskController);
app.use("/priority", priorityController);
app.use("/state", stateController);
app.use("/note", noteController);


app.listen(port, () => {
  console.log(`Application started successfully, listening on port ${port}`);
});
