const rootURL = `http://localhost:4001`;
const urlAdmin = `${rootURL}/admin`;
const urlUsers = `${rootURL}/admin-get-all-users`;
const urlUpdatePassword = `${rootURL}/admin-update-password`;
const urlPosts = `${rootURL}/post-api/admin-get-all-posts`;
const urlPostsReported = `${rootURL}/post-api/get-report`;
const urlAllRoom = `${rootURL}/get-all-rooms`;
const urlChangeStatusAccount = `${rootURL}/admin-update-account`;
const urlDeletePost = `${rootURL}/post-api/delete-post`;
const urlPassPost = `${rootURL}/post-api/update-report`;

export {
  urlUsers,
  urlPosts,
  urlPostsReported,
  urlAllRoom,
  urlChangeStatusAccount,
  urlDeletePost,
  urlPassPost,
  urlAdmin,
  urlUpdatePassword,
};
