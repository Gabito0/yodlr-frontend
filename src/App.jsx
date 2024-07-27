import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";
import userApi from "./api/api";
import { jwtDecode } from "jwt-decode";
import UserContext from "./auth/UserContext";
import AppRoutes from "./routes-nav/AppRoutes";
import Navigation from "./routes-nav/Navigation";

export const TOKEN_STORAGE_ID = "Yoldr-token";
/**Yoldr Application
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed aroud via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the user LocalStorage hook
 *
 * App -> Routes
 */
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  // console.debug(
  //   "App",
  //   "infoLoaded=",
  //   setInfoLoaded,
  //   "currentUser=",
  //   currentUser,
  //   "token=",
  //   token
  // );
  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependenct for this effect

  useEffect(
    function loadUserInfo() {
      // console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { id } = jwtDecode(token);
            // put the token on the Api class so it can use it to call the API.
            userApi.token = token;
            let currentUser = await userApi.getCurrentUser(id);
            setCurrentUser(currentUser);
          } catch (err) {
            // console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );
  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    // console.log("settoken is being set to null");
    setToken(null);
  }

  /** Handles site-wide signup.
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await userApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      // console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /**Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await userApi.login(loginData);
      setToken(token);

      // Wait for currentUser to be set
      let { id } = jwtDecode(token);
      userApi.token = token;
      let currentUser = await userApi.getCurrentUser(id);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (errors) {
      // console.error("login failed", errors);
      return { success: false, errors };
    }
  }
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser , setInfoLoaded}}>
        <div className="App">
          <Navigation logout={logout}></Navigation>
          <AppRoutes login={login} signup={signup} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
