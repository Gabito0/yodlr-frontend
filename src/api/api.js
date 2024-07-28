import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class userApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${userApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(id) {
    let res = await this.request(`users/${id}`);
    return res.data.user;
  }

  /**Get all users */
  static async getAllUsers() {
    let res = await this.request(`users/`);
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

export default userApi;
