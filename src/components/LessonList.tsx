import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { getDataFromLocalStorage } from "@/database/localStorage";
import { getCourseById } from "@/services/course.crud";
import { Lesson } from "@/models/lesson.model";

type LessonListProps = {
  courseId: string;
  items: Lesson[];
};

const LessonList = ({ courseId, items }: LessonListProps) => {
  const router = useRouter();
  const course = useMemo(() => {
    const data = getCourseById(courseId);

    if (!data) {
      // ...
      return null;
    }

    return data;
  }, []);

  console.log("course", course);

  return (
    <div>
      <div>LessonList</div>
      <div>
        <button type="button" onClick={() => router.push("/courses")}>
          Meus cursos
        </button>
      </div>

      {/* <div>Current lesson Id: {currentLessonId}</div> */}
      <div>Course Id: {courseId}</div>
      <div>
        {items.map((lesson) => (
          <div key={lesson.id}>{lesson.title}</div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
