
exports.seed = async function(knex) {
  await knex("users").insert([
    { phoneNumber: 5554441234, password: "thisIsIt!" }
  ])
};
