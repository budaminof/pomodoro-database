
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pomodoro', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pomodoro');
};
