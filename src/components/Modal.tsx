import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  title?: string | ReactNode;
  onClose?: () => void;
};
const Modal = ({ children, title, onClose }: ModalProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: "100%",
          padding: "20px 20px 32px",
          backgroundColor: "#242424",
          borderRadius: 6,
          position: "relative",
          zIndex: 11,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          fontSize: 14,
        }}
      >
        {!!onClose && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 18,
              fontWeight: 700,
              padding: 10,
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            X
          </div>
        )}
        {!!title && (
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
