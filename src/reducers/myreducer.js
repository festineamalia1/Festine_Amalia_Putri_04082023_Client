const intialState = {
  num: 0,
  data: null,
  error: "",
};

{
  /*
const reducer = (state = intialState, action) => {

    switch (action.type) {
        case "INCREMENT":
            return { ...state, num: state.num + 1 }
        case "FetchData":
            return { ...state, data: action.data }
        case "ERROR":
            return { ...state, error: action.msg }
        default:
            return state
    }

}
*/
}


const reducer = (state = { status: "logged out", value: "guest" }, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN");
      return Object.assign({}, state, {
        status: "logged in",
        value: action.value,
      });
    case "LOGOUT":
      return Object.assign({}, state, {
        status: "logged out",
        value: action.value,
      });
    default:
      return state;
  }
};


export default reducer;
