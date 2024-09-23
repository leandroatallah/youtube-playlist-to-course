"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/context/ToastContext";
import { getDataFromLocalStorage } from "@/database/localStorage";
import { Course } from "@/models/course.model";
import { deleteCourse, exportCourses } from "@/services/course.crud";

import { Button } from "../Button";
import CourseItem from "../CourseItem";
import { ModalAddCourse } from "../ModalAddCourse";
import { ModalExport } from "../ModalExport";
import styles from "./CourseList.module.css";

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
    <div className={styles.container}>
      <div className={styles.buttonTrack}>
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
        <div className={styles.listContainer}>
          <div className={styles.list}>
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
        <div className={styles.emptyMessage}>Não há cursos cadastrados.</div>
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
