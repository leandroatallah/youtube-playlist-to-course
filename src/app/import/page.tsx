"use client";

import Modal from "@/components/Modal";
import { importCourses } from "@/services/course.crud";
import { useSearchParams } from "next/navigation";

const ImportPage = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const handleConfirmImport = () => {
    if (!data) {
      // ...
      return;
    }

    const dataParsed = JSON.parse(data);

    const { status } = importCourses(dataParsed);

    if (status === 400) {
      // ...
      return;
    }
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
          onClick={handleConfirmImport}
        >
          importar cursos
        </button>
        <button
          style={{ height: 40 }}
          type="button"
          onClick={handleCancelImport}
        >
          cancelar
        </button>
      </Modal>
    </div>
  );
};

export default ImportPage;
