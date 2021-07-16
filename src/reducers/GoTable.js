import { urlPosts, urlPostsReported, urlUsers } from '../constant';
export default function goTable(state = urlUsers, action) {
  switch (action.type) {
    case 'GET_POSTS': {
      return urlPosts;
    }
    case 'GET_USERS': {
      return urlUsers;
    }
    case 'GET_POSTS_REPORTED': {
      return urlPostsReported;
    }
    default:
      return state;
  }
}
