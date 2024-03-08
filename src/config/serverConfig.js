const dotenv=require('dotenv');
const bcrypt=require('bcrypt');
dotenv.config();//calls .env file

module.exports={
    PORT:process.env.PORT,
    SALT:bcrypt.genSaltSync(13),
    JWT_KEY:process.env.JWT_KEY
}