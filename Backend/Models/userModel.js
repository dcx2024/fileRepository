const db=require('../Config/db')

const TABLE="users";

const createUser=async(userData)=>{
    const [user]= await db(TABLE).insert(userData).returning("*");
    return user
}

const getUserByUsername=async(username)=>{
    return db(TABLE).where({username}).first();
}

module.exports={createUser,getUserByUsername}
