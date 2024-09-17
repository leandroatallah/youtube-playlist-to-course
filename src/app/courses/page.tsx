"use client";

import { exportCourses } from "@/services/course.crud";
import styles from "../page.module.css";
import CourseList from "@/components/CourseList";
import { useRef, useState } from "react";

export default function Courses() {
  const inputRef = useRef<HTMLInputElement>(null);

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
      // ...
      return;
    }
    navigator.clipboard.writeText(exportUrl);
    inputRef.current?.select();

    // ...
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: "100%",
              padding: "40px 20px",
              backgroundColor: "#242424",
              borderRadius: 6,
              position: "relative",
              zIndex: 11,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 18,
                fontWeight: 700,
                padding: 10,
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={handleOnCloseExportModal}
            >
              X
            </div>
            <div
              style={{
                fontSize: 21,
                fontWeight: 700,
              }}
            >
              Exportar progresso atual
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
