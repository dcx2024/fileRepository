const db=require('../Config/db')

const TABLE='exam_files';

const createExamFiles = async (trx, postId, files) => {
  const rows = files.map((file) => ({
    post_id: postId,
    file_path: file.filename,
    file_type: file.mimetype,
    original_name: file.originalname,
  }));

  return db(TABLE)
    .transacting(trx)
    .insert(rows);
};

module.exports = {
  createExamFiles,
};