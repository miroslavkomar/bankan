const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const stateFolderPath = path.join(__dirname, "storage", "stateList");

// Method to read task state from a file
function get(stateId) {
  try {
    const filePath = path.join(stateFolderPath, `${stateId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadTaskState", note: error.note };
  }
}

// Method to write task state to a file
function create(state) {
  try {
    state.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(stateFolderPath, `${state.id}.json`);
    const fileData = JSON.stringify(state);
    fs.writeFileSync(filePath, fileData, "utf8");
    return state;
  } catch (error) {
    throw { code: "failedToCreateTaskState", note: error.note };
  }
}

// Method to remove task state from a file
function remove(stateId) {
  try {
    const filePath = path.join(stateFolderPath, `${stateId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveTaskState", note: error.note };
  }
}

// Method to list task states in a folder
function list() {
  try {
    const files = fs.readdirSync(stateFolderPath);
    return files.map((file) => {
      const fileData = fs.readFileSync(path.join(stateFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
  } catch (error) {
    throw { code: "failedToListTaskStates", note: error.note };
  }
}

module.exports = {
  create,
  get,
  remove,
  list,
};
