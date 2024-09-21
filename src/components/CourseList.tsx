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

  useEffect(() => {
    fetchCourseList();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        backgroundColor: "#1a1a1a",
        padding: 20,
        borderRadius: 4,
        minHeight: "40vh",
      }}
    >
      {hasCourses ? (
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
          gap: 10,
        }}
      >
        <Button
          style={{
            flex: 1,
          }}
          onClick={handleAddCourses}
        >
          + adicionar curso
        </Button>
        {hasCourses && (
          <div>
            <Button
              variant="outline"
              onClick={() => setShowAddCourseModal(true)}
            >
              Exportar
            </Button>
          </div>
        )}
      </div>
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
