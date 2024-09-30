const sudo = require('sudo-prompt');
const os = require('os');

const options = {
  name: 'Your App Name'
};

const command = 'echo Hello, World!'; // 简单的命令

sudo.exec(command, options, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`标准输出: ${stdout}`);
  console.error(`标准错误: ${stderr}`);
});