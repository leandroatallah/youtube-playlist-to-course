import { useMemo } from "react";

import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { getProgress } from "@/utils/get-pregress";

import styles from "./LessonList.module.css";

type LessonListProps = {
  course: Course;
  items: Lesson[];
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  toggleLessonStatus: (lesson: Lesson) => void;
};

const LessonList = ({
  course,
  items,
  currentLessonId,
  onSelectLesson,
  toggleLessonStatus,
}: LessonListProps) => {
  const progress = useMemo(() => getProgress(course.lessons), [course.lessons]);

  return (
    <div className={styles.container}>
      <div className={styles.lessonListHeader}>
        <div
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Aulas
        </div>
        <div
          style={{
            fontSize: 14,
          }}
        >
          {progress.toFixed(0)}%
        </div>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            paddingBottom: 24,
          }}
        >
          {items.map((lesson) => {
            const isCurrent = lesson.id === currentLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "14px 10px 14px 20px",
                  fontSize: 14,
                  cursor: "pointer",
                  backgroundColor: isCurrent ? "var(--primary)" : "unset",
                }}
              >
                <div
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: isCurrent ? "#fff" : "777",
                    borderRadius: 2,
                    backgroundColor: lesson.done ? "#fff" : "unset",
                    zIndex: 10,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleLessonStatus(lesson);
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      color: "#000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {lesson.done && (
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="12px"
                        width="12px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                      </svg>
                    )}
                  </div>
                </div>
                {lesson.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LessonList;
