let initialState = {
  active: false,
  index: null,
};

let modalInfo = (state = initialState, action) => {
  switch (action.type) {
    case "MODALINFO_ACTIVE": {
      return {
        ...state,
        active: true,
        index: action.payload,
      };
    }
    case "MODALINFO_CLOSE": {
      return {
        ...state,
        active: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default modalInfo;
