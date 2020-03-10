
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.integer("phoneNumber").notNull().unique()
    table.text("password").notNull().unique()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
