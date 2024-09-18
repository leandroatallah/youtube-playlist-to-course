"use client";

import { useRef, useState } from "react";

import { exportCourses } from "@/services/course.crud";
import styles from "../page.module.css";
import CourseList from "@/components/CourseList";
import Modal from "@/components/Modal";
import { useToast } from "@/context/ToastContext";

export default function Courses() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [exportUrl, setExportUrl] = useState<string>();

  const handleExportCourses = () => {
    const data = exportCourses();

    if (data) {
      const baseUrl = window.location.origin;
      setExportUrl(`${baseUrl}/import?${data}`);
    }
  };

  const handleOnCloseExportModal = () => {
    setExportUrl(undefined);
  };

  const handleOnCopyUrl = () => {
    if (!exportUrl) {
      return;
    }
    navigator.clipboard.writeText(exportUrl);
    inputRef.current?.select();

    toast("A URL foi copiada com sucesso.");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Utemy</h1>
        <button type="button" onClick={handleExportCourses}>
          Exportar
        </button>
        <CourseList />
      </main>

      {!!exportUrl && (
        <Modal
          title="Exportar progresso atual"
          onClose={handleOnCloseExportModal}
        >
          <div
            style={{
              fontSize: 14,
            }}
          >
            Copie a URL abaixo e cole em outro navegador para copiar seu
            progresso atual.
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
            value={exportUrl}
            disabled
          />
          <button
            style={{
              height: 40,
              cursor: "pointer",
            }}
            type="button"
            onClick={handleOnCopyUrl}
          >
            Copiar
          </button>
        </Modal>
      )}
    </div>
  );
}
