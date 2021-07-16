import { urlPosts, urlUsers } from '../constant';
export default function goTable(state = urlUsers, action) {
  switch (action.type) {
    case 'GET_POSTS': {
      return urlPosts;
    }
    case 'GET_USERS': {
      console.log('qweqwe');
      return urlUsers;
    }
    default:
      return state;
  }
}
