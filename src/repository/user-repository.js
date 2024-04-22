const { User } = require("../models/index");
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
      throw { error };
    }
  }
  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
    }
  }
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"], //to get specific attributes
      });
      return user;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
    }
  }

  async getByUserName(username) {
    try {
      const user = await User.findOne({
        where: {
          userName: username,
        },
      });

      return user;
    } catch (error) {
      console.log("Something Went Wrong In Repo Layer");
      console.log(error);
      throw { error };
    }
  }
}

module.exports = UserRepository;
