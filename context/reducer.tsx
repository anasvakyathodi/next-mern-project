const initialState = {
  user: {},
  tableData: [],
  count: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TABLEDATA":
      return {
        ...state,
        tableData: action.tableData,
        count: action.count,
      };
    default:
      return state;
  }
};

export { initialState };

export default reducer;
