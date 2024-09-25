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
    if (typeof window == "undefined") {
      return;
    }
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
            <Button
              icon={
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Export">
                    <g>
                      <path d="M5.552,20.968a2.577,2.577,0,0,1-2.5-2.73c-.012-2.153,0-4.306,0-6.459a.5.5,0,0,1,1,0c0,2.2-.032,4.4,0,6.6.016,1.107.848,1.589,1.838,1.589H18.353A1.546,1.546,0,0,0,19.825,19a3.023,3.023,0,0,0,.1-1.061V11.779h0a.5.5,0,0,1,1,0c0,2.224.085,4.465,0,6.687a2.567,2.567,0,0,1-2.67,2.5Z"></path>
                      <path d="M12.337,3.176a.455.455,0,0,0-.311-.138c-.015,0-.028,0-.043-.006s-.027,0-.041.006a.457.457,0,0,0-.312.138L7.961,6.845a.5.5,0,0,0,.707.707l2.816-2.815V15.479a.5.5,0,0,0,1,0V4.737L15.3,7.552a.5.5,0,0,0,.707-.707Z"></path>
                    </g>
                  </g>
                </svg>
              }
              variant="outline"
              onClick={handleExportCourses}
            >
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
