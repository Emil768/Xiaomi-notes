let initialState = {
  searchText: "",
};

let search = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TEXT": {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default search;
