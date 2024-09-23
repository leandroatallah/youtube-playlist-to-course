import { useDetectClickOutside } from "@/hooks/useDetectClickOutside";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  title?: string | ReactNode;
  onClose?: () => void;
};
const Modal = ({ children, title, onClose }: ModalProps) => {
  const ref = useDetectClickOutside({
    onTriggered: () => onClose && onClose(),
  });

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
        ref={ref}
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
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M368 368 144 144m224 0L144 368"
              ></path>
            </svg>
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
