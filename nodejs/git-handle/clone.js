const git = require("./utils/git");

const repoPath = "your git repo url";
const localPath = require("path").join(process.cwd(), "../../..", "test-clone");
git
  .clone(repoPath, localPath)
  .then(() => console.log("Cloned successfully"))
  .catch((err) => console.error("Failed to clone:", err));
