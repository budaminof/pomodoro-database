
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pomodoro', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('user_id').notNullable();
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pomodoro');
};
