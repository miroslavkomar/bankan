const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const priorityFolderPath = path.join(__dirname, "storage", "priorityList");

// Method to read a priority from a file
function get(priorityId) {
  try {
    const filePath = path.join(priorityFolderPath, `${priorityId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadPriority", note: error.note };
  }
}

// Method to write a priority to a file
function create(priority) {
  try {
    priority.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(priorityFolderPath, `${priority.id}.json`);
    const fileData = JSON.stringify(priority);
    fs.writeFileSync(filePath, fileData, "utf8");
    return priority;
  } catch (error) {
    throw { code: "failedToCreatePriority", note: error.note };
  }
}

// Method to remove a priority from a file
function remove(priorityId) {
  try {
    const filePath = path.join(priorityFolderPath, `${priorityId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovePriority", note: error.note };
  }
}

// Method to list task priorities in a folder
function list() {
  try {
    const files = fs.readdirSync(priorityFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(path.join(priorityFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListPriorities", note: error.note };
  }
}

module.exports = {
  create,
  get,
  remove,
  list,
};
