import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";

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
  return (
    <div
      style={{
        border: "1px solid #aaa",
        borderRadius: 4,
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "space-between",
          gap: 10,
          padding: "10px 0 20px",
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {course.title}
        </div>
        <div
          style={{
            fontSize: 14,
          }}
        >
          20%
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
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
                gap: 10,
                border: "1px solid #aaa",
                borderRadius: 4,
                padding: 10,
                fontSize: 12,
                cursor: "pointer",
                backgroundColor: isCurrent
                  ? "rgba(125, 125, 125, 0.5)"
                  : "unset",
              }}
            >
              <div
                style={{
                  border: "1px solid #777",
                  borderRadius: 2,
                  backgroundColor: lesson.done ? "#777" : "unset",
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
  );
};

export default LessonList;
