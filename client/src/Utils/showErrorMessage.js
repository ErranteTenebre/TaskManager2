import { enqueueSnackbar } from "notistack";

export default (error) =>
  enqueueSnackbar(error.response.data, { variant: "error" });
