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
              icon={
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  fill-rule="evenodd"
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h360c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H184V184h656v320c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V144c0-17.7-14.3-32-32-32ZM770.87 824.869l-52.2 52.2c-4.7 4.7-1.9 12.8 4.7 13.6l179.4 21c5.1.6 9.5-3.7 8.9-8.9l-21-179.4c-.8-6.6-8.9-9.4-13.6-4.7l-52.4 52.4-256.2-256.2c-3.1-3.1-8.2-3.1-11.3 0l-42.4 42.4c-3.1 3.1-3.1 8.2 0 11.3l256.1 256.3Z"
                    transform="matrix(1 0 0 -1 0 1024)"
                  ></path>
                </svg>
              }
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
