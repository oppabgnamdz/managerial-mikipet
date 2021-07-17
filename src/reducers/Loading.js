export default function loading(state = true, action) {
  switch (action.type) {
    case 'LOADING': {
      return true;
    }
    case 'FINISH': {
      return false;
    }
    default:
      return state;
  }
}
