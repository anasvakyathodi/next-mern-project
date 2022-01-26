import axios from "./../configs/axios";

export const login = async (
  props: any,
  dispatch: any,
  router: any
): Promise<any> => {
  await axios
    .post("/users/login", {
      email: props.email,
      password: props.password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: "SET_USER",
          user: res.data,
        });
        router.replace("/");
      } else {
        alert("Something went wrong!");
      }
    })
    .catch(() => {
      alert("Something went wrong!");
    });
};

interface Data {
  pageNumber: number | null;
  rowsPerPage: number | null;
}
export const getTableData = async (data: Data, dispatch: any): Promise<any> => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token ? token : "";

  await axios
    .get("/articles", {
      params: {
        limit: data.rowsPerPage,
        page: data.pageNumber,
      },
    })
    .then((res) => {
      dispatch({
        type: "SET_TABLEDATA",
        tableData: res.data.data,
        count: res.data.count,
      });
    });
};
