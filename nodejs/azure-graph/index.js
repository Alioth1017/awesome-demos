const { getClient } = require("./client.js");

const client = getClient();

async function getUsers() {
  const res = await client.api("/users/").get();
  console.log(res);
  return res;
}

async function getUser(email) {
  const res = await client.api(`/users/${email}`).get();
  console.log(res);
  return res;
}

async function getUserExtensionAttributes(email) {
  const user = await getUser(email);
  const res = await client
    .api(`/users/${user.id}?$select=onPremisesExtensionAttributes`)
    .get();
  console.log(res);
  return res;
}

(async function () {
  getUsers();
  getUser("test.test@test.com");
  getUserExtensionAttributes("test.test@test.com");
})();
