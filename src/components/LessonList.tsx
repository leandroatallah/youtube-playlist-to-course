import { useMemo } from "react";

import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { getProgress } from "@/utils/get-pregress";

type LessonListProps = {
  course: Course;
  items: Lesson[];
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
};

const LessonList = ({
  course,
  items,
  currentLessonId,
  onSelectLesson,
}: LessonListProps) => {
  const progress = useMemo(() => getProgress(course.lessons), [course.lessons]);

  return (
    <div
      style={{
        borderLeft: "2px solid #777",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "space-between",
          gap: 10,
          backgroundColor: "#1A1A1A",
          padding: 20,
        }}
      >
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
                    backgroundColor: lesson.done ? "#999" : "unset",
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                    }}
                  ></div>
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
