const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const taskFolderPath = path.join(__dirname, "storage", "taskList");

// Method to read task from a file
function get(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTask", note: error.note };
  }
}

// Method to write task to a file
function create(task) {
  try {
    task.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(task);
    fs.writeFileSync(filePath, fileData, "utf8");
    return task;
  } catch (error) {
    throw { code: "failedToCreateTask", note: error.note };
  }
}

// Method to update task in a file
function update(task) {
  try {
    const currentTask = get(task.id);
    if (!currentTask) return null;
    const newTask = task;
    const filePath = path.join(taskFolderPath, `${task.id}.json`);
    const fileData = JSON.stringify(newTask);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newTask;
  } catch (error) {
    throw { code: "failedToUpdateTask", note: error.note };
  }
}

// Method to remove task from a file
function remove(taskId) {
  try {
    const filePath = path.join(taskFolderPath, `${taskId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveTask", note: error.note };
  }
}

// Method to list tasks in a folder
function list(dueDateFrom, dueDateTo) {
  try {
    const files = fs.readdirSync(taskFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(path.join(taskFolderPath, file), "utf8");
      return JSON.parse(fileData);
    }).filter(task => new Date(dueDateFrom) <= new Date(task.dueDate) && new Date(task.dueDate) <= new Date(dueDateTo));
  } catch (error) {
    throw { code: "failedToListTasks", note: error.note };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
