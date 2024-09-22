import { useMemo } from "react";

import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { Button } from "./Button";

type VideoDetailProps = {
  course: Course;
  onFinish: (lesson: Lesson | null) => void;
};

const VideoDetail = ({ course, onFinish }: VideoDetailProps) => {
  const currentLesson = useMemo<Lesson | undefined>(() => {
    return course.lessons.find(
      (lesson) => lesson.id === course.currentLessonId,
    );
  }, [course.currentLessonId, course.lessons]);

  return (
    <div style={{ height: "calc(100% - 80px)" }}>
      <div
        style={{
          // overflow: "hidden",
          // paddingBottom: "56.25%",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${currentLesson?.videoId}?autoplay=1&loop=0&controls=1&modestbranding=0&rel=0&playsinline=1&ena
blejsapi=1`}
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
      <div style={{ padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: 80,
            gap: 10,
            fontSize: 21,
            fontWeight: 700,
          }}
        >
          {/* <div */}
          {/*   style={{ */}
          {/*     flex: 1, */}
          {/*   }} */}
          {/* > */}
          {/*   {currentLesson?.title} */}
          {/* </div> */}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${currentLesson?.videoId}`,
                  "_blank",
                )
              }
            >
              ver no youtube
            </Button>
            <Button onClick={() => onFinish(currentLesson || null)}>
              {currentLesson?.done
                ? "Marcar como pendente"
                : "Marcar como concluído"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
