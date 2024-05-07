class Chat {
  constructor(client) {
    this.client = client;
  }
  async createChat(users) {
    const chat = {
      chatType: "oneOnOne",
      members: users.map((user) => ({
        "@odata.type": "#microsoft.graph.aadUserConversationMember",
        roles: ["owner"],
        "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${user}')`,
      })),
    };
    const res = await this.client.api("/chats").post(chat);
    // console.log(res);
    return res;
  }
  async sendMessage(chatId, content) {
    const chatMessage = {
      body: {
        content,
      },
    };

    const res = await this.client.api(`/chats/${chatId}/messages`).post(chatMessage);
    return res;
  }
}

module.exports = Chat;
