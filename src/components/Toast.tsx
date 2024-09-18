"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useToast, ToastProvider } from "@/context/ToastContext";

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
      style={{
        width: 320,
        maxWidth: "100%",
        height: 58,
        overflow: "hidden",
        transition: `${TOAST_LEAVE_DURATION / 1000}s ${TOAST_DURATION / 1000}s all ease-in`,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: 10,
          height: 48,
          background: "#456598",
          fontSize: 14,
        }}
      >
        <div
          id="toast-bar"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#ff2222",
            height: 4,
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
    <div
      style={{
        position: "fixed",
        right: 40,
        bottom: 40,
        display: "flex",
        flexDirection: "column-reverse",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
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
