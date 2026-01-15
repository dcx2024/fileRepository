/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')
  const exists= await knex.schema.hasTable("exam_posts");
  if(!exists){
    await knex.schema.createTable('exam_posts',table=>{
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('title',255).notNullable();
    table.text('course_code',20).notNullable();
    table.integer('semester').notNullable();
    table.text('academic_year',10).notNullable();
     table.date('created_date').defaultTo(knex.raw("(now() AT TIME ZONE 'Africa/Lagos')::date")).notNullable();
  })
};}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('exam_posts')
};
