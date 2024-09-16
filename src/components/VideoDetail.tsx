import { useMemo } from "react";

import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";

type VideoDetailProps = {
  course: Course;
};
const VideoDetail = ({ course }: VideoDetailProps) => {
  const currentLesson = useMemo<Lesson | undefined>(() => {
    return course.lessons.find(
      (lesson) => lesson.id === course.currentLessonId,
    );
  }, [course.currentLessonId, course.lessons]);

  return (
    <div>
      {" "}
      <div
        style={{
          overflow: "hidden",
          paddingBottom: "56.25%",
          position: "relative",
          height: 0,
        }}
      >
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${currentLesson?.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyItems: "space-between",
          gap: 10,
          marginTop: 15,
          fontSize: 21,
          fontWeight: 700,
        }}
      >
        <div>{currentLesson?.title}</div>
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button
            type="button"
            style={{
              whiteSpace: "nowrap",
              padding: "0 10px",
              cursor: "pointer",
            }}
          >
            ver no youtube
          </button>
          <button
            type="button"
            style={{
              whiteSpace: "nowrap",
              padding: "0 10px",
              cursor: "pointer",
            }}
          >
            concluir lição
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
