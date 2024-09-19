import { useRef } from "react";

import { useToast } from "@/context/ToastContext";
import Modal from "./Modal";
import { Button } from "./Button";

type ModalExportProps = {
  url: string;
  setUrl: (url: string | undefined) => void;
};
export const ModalExport = ({ url, setUrl }: ModalExportProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleOnCloseExportModal = () => {
    setUrl(undefined);
  };

  const handleOnCopyUrl = () => {
    if (!url) {
      return;
    }
    navigator.clipboard.writeText(url);
    inputRef.current?.select();

    toast("A URL foi copiada com sucesso.");
  };

  return (
    <Modal title="Exportar progresso atual" onClose={handleOnCloseExportModal}>
      <div
        style={{
          fontSize: 14,
        }}
      >
        Copie a URL abaixo e cole em outro navegador para copiar seu progresso
        atual.
      </div>
      <input
        style={{
          width: "100%",
          border: "2px solid #444",
          borderRadius: 4,
          backgroundColor: "#1a1a1a",
          height: 40,
          padding: "0 10px",
          color: "#fff",
        }}
        type="text"
        value={url}
        disabled
      />
      <Button onClick={handleOnCopyUrl}>Copiar</Button>
    </Modal>
  );
};
