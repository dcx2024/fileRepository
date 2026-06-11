/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')
  const exists= await knex.schema.hasTable("exam_files");
  if(!exists){
    await knex.schema.createTable('exam_files',table=>{
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('post_id').references('id').inTable('exam_posts');
        table.text('file_path').notNullable();
        table.text('file_type',50).notNullable();
        table.text('original_name').notNullable();
    })
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('exam_files')
};
