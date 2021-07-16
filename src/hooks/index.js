import { useSelector } from 'react-redux';
import { urlAllRoom, urlPosts, urlPostsReported, urlUsers } from '../constant';
export const checkURL = (urlFetch) => {
  switch (urlFetch) {
    case urlUsers:
      return 'User page';
    case urlPosts:
      return 'Post page';
    case urlPostsReported:
      return 'Post Reported';
    default:
      return 'Fail to load page';
  }
};
