import { RedishError, Result } from "@redish-shared/domain";
import axios from "axios";
import { toast } from "react-toastify";

export function handleAxiosError<T>(error: unknown): Result<T> {
  const castError = RedishError.Unknown();

  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    // either RedishError or ApiError
    castError.message = data['message'] ?? data['error'] ?? castError.message;
    castError.code = data['code'] ?? data['statusCode'] ?? castError.code;
    castError.cause = data['cause'] ?? data['error'] ?? castError.cause;
  }

  toast.error(`${castError.message} (${castError.code} - ${castError.cause})`, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  return Result.error(castError);
}
