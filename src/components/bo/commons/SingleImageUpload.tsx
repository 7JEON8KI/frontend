/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import React from "react";
import FileUploadService from "./FileUploadService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "pages/bo/redux";
import { changeBy } from "pages/bo/redux/changer";

const SingleImageUpload: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [imageInfos, setImageInfos] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const dispatch = useDispatch();
  const bannerData = useSelector((state: RootState) => state.banner.banner);
  const onChangeBy = (diff: string) => {
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
        setImageInfos(response.data.data);
        onChangeBy(response.data.data);
        return response.data;
      })
      .catch(err => {
        setProgress(0);

        if (err.response && err.response.data && err.response.data.message) {
          console.log(err.response.data.message);
        }
        setCurrentImage(undefined);
      });
  };

  useEffect(() => {
    if (Object.keys(bannerData).length > 0) {
      setImageUrl(bannerData.banner_image_url);
    }
  }, [bannerData]);
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
            이미지업로드
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

      {imageInfos.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">배너 이미지</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <img src={imageInfos} alt={imageInfos} style={{ maxWidth: "80%" }} />
            </li>
          </ul>
        </div>
      )}
      {imageUrl.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">기존 이미지</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <img src={imageUrl} style={{ maxWidth: "80%" }} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
