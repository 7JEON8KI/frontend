import React from "react";
import Modal from "react-modal";

interface ModalContainerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  title?: string;
  topCloseShow?: boolean;
  ariaHideApp?: boolean;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    left: "0",
    margin: "auto",
    width: "500px",
    height: "600px",
    padding: "0",
    overflow: "hidden",
  },
};

const ModalContainer = ({
  children,
  isOpen,
  onClose,
  width = "500px",
  height = "600px",
  title = "모달 타이틀",
  topCloseShow = true,
  ariaHideApp,
}: ModalContainerProps) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={{
      ...customStyles,
      content: { ...customStyles.content, width: width, height: height },
    }}
    contentLabel="Pop up Message"
    shouldCloseOnOverlayClick
    ariaHideApp={ariaHideApp ? ariaHideApp : false}
  >
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start" }}>
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f4f4f4",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.25rem", paddingLeft: "1rem" }}>{title}</span>
        {topCloseShow && (
          <button
            type="button"
            style={{
              fontWeight: "bold",
              padding: "0.5rem",
              margin: "0.5rem",
            }}
            onClick={onClose}
            title="닫기"
          >
            X
          </button>
        )}
      </div>
      <div style={{ width: width, height: `calc(${parseInt(height, 10) - 40}px)` }}>{children}</div>
    </div>
  </Modal>
);

export default ModalContainer;
