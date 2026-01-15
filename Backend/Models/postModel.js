const db = require('../Config/db');

const TABLE = 'exam_posts';

const createExamPost = async (trx, data) => {
  const [post] = await db(TABLE)
    .transacting(trx)
    .insert({
      title: data.title,
      course_code: data.course_code,
      semester: data.semester,
      academic_year: data.academic_year,
    })
    .returning('id');

  return post;
};

module.exports = {
  createExamPost,
};
