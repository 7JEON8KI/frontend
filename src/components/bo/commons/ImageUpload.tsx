/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import React from "react";
import FileUploadService from "./FileUploadService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { changeBy } from "pages/bo/redux/imagelist";
const ImageUpload: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [imageInfos, setImageInfos] = useState<Array<string>>([]);
  const dispatch = useDispatch();

  const onChangeBy = (diff: string[]) => {
    dispatch(changeBy(diff));
  };

  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0]);
    setProgress(0);
  };

  const upload = () => {
    setProgress(0);
    if (!currentImage) return;

    FileUploadService.upload(currentImage, (event: any) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(response => {
        setImageInfos(prevInfos => [...prevInfos, response.data.data]);
        return response.data;
      })
      .catch(err => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        }
        setCurrentImage(undefined);
      });
  };
  useEffect(() => {
    console.log("imageInfos : url:::", imageInfos);
    onChangeBy(imageInfos);
  }, [imageInfos]);

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
            이미지 업로드
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

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}

      {imageInfos.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">상품 이미지 리스트</div>
          <ul className="list-group list-group-flush">
            {imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <img src={img} alt={img} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
