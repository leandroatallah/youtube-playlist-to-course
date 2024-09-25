"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { useToast, ToastProvider } from "@/context/ToastContext";

import styles from "./Toast.module.css";

const TOAST_DURATION = 3000;
const TOAST_LEAVE_DURATION = 300;

type ToastItemProps = { text: string; onDestroy: () => void };

const ToastItem = ({ text, onDestroy }: ToastItemProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.style.opacity = "0";
      toastRef.current.style.height = "0px";

      const bar = toastRef.current.querySelector("#toast-bar");
      if (bar != null) {
        (bar as HTMLElement).style.width = "0px";
      }
    }

    let timer = setTimeout(() => {
      onDestroy();
    }, TOAST_DURATION + TOAST_LEAVE_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useLayoutEffect(() => {
    const size = toastRef.current?.getBoundingClientRect();

    if (toastRef.current && size?.width) {
      const bar = toastRef.current.querySelector("#toast-bar");
      if (bar != null) {
        (bar as HTMLElement).style.width = `${size.width.toFixed(0)}px`;
      }
    }
  }, []);

  return (
    <div
      ref={toastRef}
      className={styles.container}
      style={{
        transition: `${TOAST_LEAVE_DURATION / 1000}s ${TOAST_DURATION / 1000}s all ease-in`,
      }}
    >
      <div className={styles.toast}>
        <div
          className={styles.toastBar}
          id="toast-bar"
          style={{
            transition: `${TOAST_DURATION / 1000}s all ease-in-out`,
          }}
        />
        {text}
      </div>
    </div>
  );
};

export const ToastStack = () => {
  const { toastList, removeToast } = useToast();

  return (
    <div className={styles.list}>
      {toastList.map((toast) => (
        <ToastItem
          text={toast.text}
          onDestroy={() => removeToast(toast.id)}
          key={toast.id}
        />
      ))}
    </div>
  );
};

export { ToastProvider };
