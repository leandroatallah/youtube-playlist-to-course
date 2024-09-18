"use client";

import Modal from "@/components/Modal";
import { useToast } from "@/context/ToastContext";
import { importCourses } from "@/services/course.crud";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ImportPage = () => {
  const { toast } = useToast();

  const [disableAllButtons, setDisableAllButtons] = useState(false);

  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const handleConfirmImport = () => {
    if (disableAllButtons) {
      return;
    }

    if (!data) {
      // ...
      return;
    }

    setDisableAllButtons(true);

    const dataParsed = JSON.parse(data);

    const { status } = importCourses(dataParsed);

    if (status === 400) {
      toast.error();
      setDisableAllButtons(false);
      return;
    }

    toast("Os cursos foram importados com sucesso.");

    setTimeout(() => {
      location.href = "/courses";
    }, 2000);
  };

  const handleCancelImport = () => {
    location.href = "/";
  };

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <Modal title="Deseja importar novos cursos?">
        <div
          style={{
            fontSize: 14,
          }}
        >
          Ao confirmar seu progresso atual será sobrescrito.
        </div>
        <button
          style={{ height: 40 }}
          type="button"
          disabled={disableAllButtons}
          onClick={handleConfirmImport}
        >
          Apagar conteúdo atual e importar cursos
        </button>
        <button
          style={{ height: 40 }}
          type="button"
          disabled={disableAllButtons}
          onClick={handleCancelImport}
        >
          cancelar
        </button>
      </Modal>
    </div>
  );
};

export default ImportPage;
