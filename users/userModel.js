const db = require("../data/config");
const bcrypt = require("bcryptjs");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "phoneNumber", "password");
}

async function add(users) {
  users.password = await bcrypt.hash(users.password, 14); // rounds is 2^14 === big number

  const [id] = await db("users").insert(users);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "phoneNumber");
}

module.exports = {
  find,
  findBy,
  add,
  findById
};
