
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {

  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
