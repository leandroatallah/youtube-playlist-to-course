import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ToastContextType = {
  toastList: ToastMessageProps[];
  setToastList: Dispatch<SetStateAction<ToastMessageProps[]>>;
};
const ToastContext = createContext<ToastContextType | null>(null);

type ToastMessageProps = { id: string; text: string };

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastList, setToastList] = useState<ToastMessageProps[]>([]);

  return (
    <ToastContext.Provider value={{ toastList, setToastList }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { toastList, setToastList } = useContext(
    ToastContext,
  ) as ToastContextType;

  const toast = (text: string) => {
    setToastList((prev) => {
      const id = new Date().toISOString();
      return [...prev, { id, text }];
    });
  };

  toast.error = (text?: string) => {
    toast(text || "Houve um erro. Tente novamente mais tarde.");
  };

  const removeToast = (id: string) => {
    setToastList((prev) => prev.filter((item) => item.id !== id));
  };

  return { toastList, setToastList, removeToast, toast };
};
