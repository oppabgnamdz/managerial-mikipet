export default function ReRender(state = true, action) {
  switch (action.type) {
    case 'RE_RENDER': {
      return !state;
    }
    default:
      return state;
  }
}
