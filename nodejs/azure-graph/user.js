class User {
  constructor(client) {
    this.client = client;
  }
  async getUsers() {
    const res = await this.client.api("/users/").get();
    // console.log(res);
    return res;
  }
  async getUser(email) {
    const res = await this.client.api(`/users/${email}`).get();
    // console.log(res);
    return res;
  }
  async getUserExtensionAttributes(email) {
    const user = await this.getUser(email);
    const res = await this.client
      .api(`/users/${user.id}?$select=onPremisesExtensionAttributes`)
      .get();
    // console.log(res);
    return res;
  }
}

module.exports = User