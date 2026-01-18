const db = require('../Config/db');

const TABLE_POSTS = 'exam_posts';
const TABLE_FILES = 'exam_files';


const getAllExams = async (search = '',limit=null) => {
 
  const exams = await db(TABLE_POSTS)
    .select(
      'exam_posts.*',
      db.raw(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', exam_files.id,
              'path', exam_files.file_path,
              'name', exam_files.original_name,
              'type', exam_files.file_type
            )
          ) FILTER (WHERE exam_files.id IS NOT NULL),
          '[]'
        ) AS files
      `)
    )
    .leftJoin(TABLE_FILES, 'exam_posts.id', 'exam_files.post_id')
    .modify((qb) => {
      if (search) {
        qb.whereILike('exam_posts.title', `%${search}%`)
          .orWhereILike('exam_posts.course_code', `%${search}%`);
      }
      if (limit) {
        qb.limit(limit); // This restricts the number of rows returned
      }
    })
    .groupBy('exam_posts.id')
    .orderBy('exam_posts.created_date', 'desc');

  return exams;
};


const getExamById= async(id)=>{
   const exams = await db(TABLE_POSTS)
 .select(
      'exam_posts.*',
      db.raw(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', exam_files.id,
              'path', exam_files.file_path,
              'name', exam_files.original_name,
              'type', exam_files.file_type
            )
          ) FILTER (WHERE exam_files.id IS NOT NULL),
          '[]'
        ) AS files
      `)
    )
    .leftJoin(TABLE_FILES, 'exam_posts.id', 'exam_files.post_id')
    .where('exam_posts.id',id)
    .groupBy('exam_posts.id')
    .first()

  return exams;
}

module.exports = {
  getAllExams,getExamById
};
