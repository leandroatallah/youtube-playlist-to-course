"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import Modal from "@/components/Modal";
import { useToast } from "@/context/ToastContext";
import { importCourses } from "@/services/course.crud";
import { Button } from "@/components/Button";

const ImportPage = () => {
  return (
    <Suspense>
      <div>
        <ModalImport />
      </div>
    </Suspense>
  );
};

const ModalImport = () => {
  const { toast } = useToast();

  const [disableAllButtons, setDisableAllButtons] = useState(false);

  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const handleConfirmImport = async () => {
    if (disableAllButtons) {
      return;
    }

    if (!data) {
      toast.error();

      setTimeout(() => {
        location.href = "/";
      }, 2000);

      return;
    }

    setDisableAllButtons(true);

    const dataParsed = JSON.parse(data);

    const { status } = await importCourses(dataParsed);

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
    <Modal title="Deseja importar novos cursos?">
      <div
        style={{
          fontSize: 14,
        }}
      >
        Ao confirmar seu progresso atual será sobrescrito.
      </div>
      <Button disabled={disableAllButtons} onClick={handleConfirmImport}>
        Apagar conteúdo atual e importar cursos
      </Button>
      <Button
        variant="outline"
        disabled={disableAllButtons}
        onClick={handleCancelImport}
      >
        cancelar
      </Button>
    </Modal>
  );
};

export default ImportPage;
