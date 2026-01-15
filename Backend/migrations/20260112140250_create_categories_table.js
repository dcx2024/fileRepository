/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')
  const exists=await knex.schema.hasTable('categories');
  if(!exists){
    await knex.schema.createTable('categories',table=>{
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
        table.string("name").notNullable();
    })
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =async function(knex) {
  await knex.schema.dropTable('categories')
};
