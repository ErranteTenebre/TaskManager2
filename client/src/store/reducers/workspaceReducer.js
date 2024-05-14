const initialState = {
  selectedWorkspaceId: 0,
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_WORKSPACE_ID":
      return {
        ...state,
        selectedWorkspaceId: action.payload,
      };
    default:
      return state;
  }
};

export default workspaceReducer;
