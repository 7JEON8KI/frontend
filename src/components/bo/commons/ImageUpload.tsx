/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import React from "react";
import FileUploadService from "./FileUploadService";
import "bootstrap/dist/css/bootstrap.min.css";
const ImageUpload: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [imageInfos, setImageInfos] = useState<Array<string>>([]);
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    setProgress(0);
  };

  const upload = () => {
    setProgress(0);
    if (!currentImage) return;

    FileUploadService.upload(currentImage, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(response => {
        setMessage(response.data.message);
        setImageInfos(prevInfos => [...prevInfos, response.data.data]);
        return response.data;
      })
      .catch(err => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }

        setCurrentImage(undefined);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
        </div>

        <div className="col-4">
          <button className="btn btn-success btn-sm" disabled={!currentImage} onClick={upload}>
            Upload
          </button>
        </div>
      </div>

      {currentImage && progress > 0 && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" style={{ maxWidth: "800px" }} />
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}

      {imageInfos.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <p>
                  <a href={img}>{img}</a>
                </p>
                <img src={img} alt={img} height="80px" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
