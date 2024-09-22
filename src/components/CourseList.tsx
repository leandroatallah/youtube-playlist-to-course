"use client";

import { useEffect, useState } from "react";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { deleteCourse, exportCourses } from "@/services/course.crud";
import { Course } from "@/models/course.model";
import { useToast } from "@/context/ToastContext";

import CourseItem from "./CourseItem";
import { Button } from "./Button";
import { ModalExport } from "./ModalExport";
import { ModalAddCourse } from "./ModalAddCourse";

const CourseList = () => {
  const { toast } = useToast();

  const [exportUrl, setExportUrl] = useState<string>();
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
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

  const handleAddCourses = () => {
    setShowAddCourseModal(true);
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
        backgroundColor: "#1a1a1a",
        padding: 20,
        borderRadius: 4,
        height: "calc(100% - 80px - 20px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: 14,
        }}
      >
        <Button onClick={handleAddCourses}>+ adicionar curso</Button>
        {hasCourses && (
          <div>
            <Button variant="outline" onClick={handleExportCourses}>
              Exportar
            </Button>
          </div>
        )}
      </div>
      {hasCourses ? (
        <div
          style={{
            overflowX: "auto",
            height: "100%",
            padding: 20,
            paddingTop: 30,
            backgroundColor: "#141414",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              flex: 1,
            }}
          >
            {courses.map((course) => (
              <CourseItem
                key={course.id}
                data={course}
                onDeleteCourse={() => handleRemoveCourse(course.id)}
              />
            ))}
          </div>
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
      {!!exportUrl && <ModalExport url={exportUrl} setUrl={setExportUrl} />}
      {showAddCourseModal && (
        <ModalAddCourse
          onClose={() => {
            fetchCourseList();
            setShowAddCourseModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CourseList;
