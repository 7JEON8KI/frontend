/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const upload = (file: File, onUploadProgress: any): Promise<any> => {
  const formData = new FormData();

  formData.append("multipartFile", file);

  return axios.post("https://api.mealkeat.com/api/v1/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  });
};

const FileUploadService = {
  upload,
};

export default FileUploadService;
