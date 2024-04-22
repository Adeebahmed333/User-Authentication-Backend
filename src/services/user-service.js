const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something Went Wrong In Service Layer");
      console.log(error);
      throw { error };
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something Went Wrong In Token Creation");
      console.log(error);
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something Went Wrong In Token Validation");
      console.log(error);
      throw { error };
    }
  }
  async signIn(userName, plainPassword) {
    try {
      //fetch the user using the email
      const user = await this.userRepository.getByUserName(userName);
      //compareing plain incomming password hash with stored encrypted password
      const passwordMatch = this.checkPass(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password Doesn't match");
        throw { error: "Incorrect password" };
      }
      //if password match create a token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Something Went Wrong In The SignIn Process");
      console.log(error);
      throw { error };
    }
  }
  checkPass(userInputPlainPass, encryptedPass) {
    try {
      return bcrypt.compareSync(userInputPlainPass, encryptedPass);
    } catch (error) {
      console.log("Something Went Wrong In Password Checking");
      console.log(error);
      throw { error };
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with this token exists!" };
      }
      return user.id;
    } catch (error) {
      console.log("Something Went wrong in the authentication");
      console.log(error);
      throw { error };
    }
  }
}
module.exports = UserService;
