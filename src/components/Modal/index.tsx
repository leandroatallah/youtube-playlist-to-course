import { ReactNode } from "react";

import { useDetectClickOutside } from "@/hooks/useDetectClickOutside";

import styles from "./Modal.module.css";

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
    <div className={styles.container}>
      <div ref={ref} className={styles.inner}>
        {!!onClose && (
          <div className={styles.closeIcon} onClick={onClose}>
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
        {!!title && <div className={styles.title}>{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
