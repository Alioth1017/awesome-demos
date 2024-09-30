const sudo = require("sudo-prompt");
const os = require("os");

function runAsAdmin(command, options) {
  if (os.platform() === "win32") {
    // Windows 平台
    const { exec } = require("child_process");
    exec(`runas /user:Administrator "${command}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return;
      }
      console.log(`标准输出: ${stdout}`);
      console.error(`标准错误: ${stderr}`);
    });
  } else {
    // Unix 平台 (Linux, macOS)
    sudo.exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return;
      }
      console.log(`标准输出: ${stdout}`);
      console.error(`标准错误: ${stderr}`);
    });
  }
}

// Replace 'yourScript.js' with the actual script you want to run
const command = "echo helloworld";
const options = {
  name: "Your App Name",
  // icns: "/path/to/icns/file", // (optional) 图标路径
};

runAsAdmin(command, options);
