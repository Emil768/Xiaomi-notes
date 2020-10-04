let initialState = {
  active: false,
};

let modal = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL_ACTIVE": {
      return {
        ...state,
        active: action.payload,
      };
    }
    case "MODAL_CLOSE": {
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

export default modal;
