"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { deleteCourse, exportCourses } from "@/services/course.crud";
import { Course } from "@/models/course.model";
import { useToast } from "@/context/ToastContext";

import CourseItem from "./CourseItem";
import { Button } from "./Button";
import { ModalExport } from "./ModalExport";

const CourseList = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [exportUrl, setExportUrl] = useState<string>();
  const [courses, setCourses] = useState<Course[]>([]);
  const hasCourses = !!courses.length;

  const fetchCourseList = () => {
    const data = getDataFromLocalStorage();
    setCourses(data.courses);
  };

  const handleRemoveCourse = (courseId: string) => {
    const result = deleteCourse(courseId);

    if (result.status === 400) {
      // ...
    }

    if (result.status === 202) {
      toast("O curso foi removido com sucesso.");
      fetchCourseList();
    }
  };

  const handleExportCourses = () => {
    const data = exportCourses();

    if (data) {
      const baseUrl = window.location.origin;
      setExportUrl(`${baseUrl}/import?${data}`);
    }
  };

  useEffect(() => {
    fetchCourseList();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      {hasCourses ? (
        <div>
          {courses.map((course) => (
            <CourseItem
              key={course.id}
              data={course}
              onDeleteCourse={() => handleRemoveCourse(course.id)}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#CECECE",
          }}
        >
          Não há cursos cadastrados.
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <Button onClick={() => router.push("/")}>+ adicionar curso</Button>
        {hasCourses && (
          <div>
            <Button
              style={{
                width: "100%",
              }}
              onClick={handleExportCourses}
            >
              Exportar
            </Button>
          </div>
        )}
      </div>
      {!!exportUrl && <ModalExport url={exportUrl} setUrl={setExportUrl} />}
    </div>
  );
};

export default CourseList;
