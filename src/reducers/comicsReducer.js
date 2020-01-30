export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_COMICS":
      return action.payload;

    default:
      return state;
  }
};
