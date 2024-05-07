const { getClient } = require("./utils/client.js");

const User = require("./user.js");
const Chat = require("./chat.js");

(async function () {
  const client = getClient();
  const user = new User(client);
  const chat = new Chat(client);
    user.getUsers();
    user.getUser("test.test@test.com");
    user.getUserExtensionAttributes("test.test@test.com");

    const userInfo = await user.getUser("test.test@test.com");
    const userInfo1 = await user.getUser("test2.test@test.com");
    console.log(userInfo, userInfo1);
    const chatInfo = await chat.createChat([userInfo.id, userInfo1.id]);
    const sendResult = await chat.sendMessage(chatInfo.id, "测试消息发送");
    console.log(sendResult.body);
})();
