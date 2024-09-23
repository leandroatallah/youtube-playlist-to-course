import { useRef, useEffect } from "react";

export const useDetectClickOutside = (props: { onTriggered: () => void }) => {
  const ref = useRef(null);
  const { onTriggered } = props;

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(event.target as Node)
      ) {
        onTriggered();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onTriggered, ref]);

  return ref;
};
