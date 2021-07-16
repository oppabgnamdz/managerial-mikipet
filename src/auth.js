export const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true;
  },
  getLogInStatus() {
    return this.isLoggedIn;
  },
};
