import React from "react";

const BoError: React.FC = () => {
  //5초 후 자동으로 메인 페이지로 이동
  React.useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);

  return (
    <div>
      <h1>접근 권한이 없습니다.</h1>
      <h1>3초 후 메인 페이지로 이동합니다.</h1>
    </div>
  );
};

export default BoError;
