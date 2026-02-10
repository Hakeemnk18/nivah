import toast from "react-hot-toast";


export function handleApiError(error: any) {
  console.log("inside api error ", error)
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

  const validationErrors = error?.response?.data?.errors;

  toast.error(message);


  if (validationErrors && typeof validationErrors === "object") {
    return validationErrors;
  }

  return null;
}
