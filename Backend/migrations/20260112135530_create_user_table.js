/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
 await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"') 
const exists= await knex.schema.hasTable('users')
if(!exists){
 await knex.schema.createTable('users',table=>{
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('username',50).notNullable();
    table.text('password_hash').notNullable();
    table.text('role',20).defaultTo('admin')
 })
}
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
