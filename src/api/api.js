import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class userApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${userApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      // console.error("API Error:", err.response.status, err.response.statusText);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(id) {
    let res = await this.request(`users/${id}`);
    // console.log("api is being called");
    // console.log(res.data);
    return res.data.user;
  }

  /**Get all users */
  static async getAllUsers() {
    let res = await this.request(`users/`);
    // console.log(res, "this is getAllusrs");
    return res.data.users;
  }

  /**Create user */
  static async createUser(data) {
    let res = await this.request(`users/`, data, "post");
    return res.data.user;
  }
  /**Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.data.token;
  }

  /**Signup for site */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.data.token;
  }

  /** Save user profile page. */

  static async saveProfile(userId, data) {
    let res = await this.request(`users/${userId}`, data, "put");
    return res.data.user;
  }

  /** Activate user */
  static async activateUser(data) {
    let res = await this.request(`users/activate`, data, "patch");
    return res.data.user;
  }

  /** Delete user */
  static async deleteUser(userId, data) {
    let res = await this.request(`users/${userId}`, data, "delete");
    return res.status;
  }
}

async function testing() {
  try {
    // const token = await userApi.login({
    //   email: "adminUser@test.com",
    //   password: "password",
    // });
    // console.log(token, "logining"); // Handle the user data as needed
    // userApi.token = token;
    // const allusers = await userApi.getAllUsers();
    // console.log(allusers);
    // const user = await userApi.getCurrentUser(1);
    // console.log(user, "getCurrentUser");
    // const newUser = await userApi.createUser({
    //   email: "user37@test.com",
    //   firstName: "user35",
    //   lastName: "user35",
    //   isAdmin: "false",
    //   password: "password",
    //   state: "active",
    // });
    // console.log("newuser=:", newUser);
    // const deleteUser = await userApi.deleteUser(9);
    // console.log(deleteUser);
    // const singUp = await userApi.signup({
    //   email: "user40@test.com",
    //   password: "password",
    //   firstName: "user39",
    //   lastName: "user39",
    // });
    // console.log(singUp);
    // const updateUser = await userApi.saveProfile(12, {
    //   email: "user46@test.com",
    //   currentPassword: "password",
    //   firstName: "user46",
    //   lastName: "user46",
    //   state: "active",
    // });
    // console.log(updateUser);
    // const activateUser = await userApi.activateUser({ id: 11 });
    // console.log(activateUser);
  } catch (error) {
    // console.error("error:", error);
  }
}

// Call the function to login the user
// testing();

export default userApi;
