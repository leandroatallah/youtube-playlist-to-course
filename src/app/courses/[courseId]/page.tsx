"use client";

import { useCallback, useMemo } from "react";

import { Course } from "@/models/course.model";
import VideoDetail from "@/components/VideoDetail";
import LessonList from "@/components/LessonList";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { getCourseById, updateCurrentLesson } from "@/services/course.crud";

const CourseDetail = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();

  const course: Course | null = useMemo(() => {
    return getCourseById(params.courseId);
  }, [params.courseId]);

  const handleOnSelectLesson = useCallback(
    (lessonId: string) => {
      if (!course?.id) {
        // ...
        return;
      }

      if (course.currentLessonId === lessonId) {
        return;
      }

      updateCurrentLesson(course?.id, lessonId);

      location.reload();
    },
    [course?.currentLessonId, course?.id],
  );

  if (!course || !course.currentLessonId) {
    return <div>Not found</div>;
  }

  return (
    <div
      style={{
        maxWidth: 1024,
        margin: "0 auto",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyItems: "space-between",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <Logo />
        </div>
        <button
          type="button"
          style={{
            padding: 0,
            border: 0,
            background: "unset",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => router.push("/courses")}
        >
          Meus cursos
        </button>
      </div>
      <h1
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 32,
        }}
      >
        {course?.title}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 20,
        }}
      >
        <div
          style={{
            width: "calc(100% - 280px)",
          }}
        >
          <VideoDetail course={course} />
        </div>

        <div
          style={{
            width: 280,
          }}
        >
          <LessonList
            currentLessonId={course.currentLessonId}
            course={course}
            items={course.lessons}
            onSelectLesson={(lessonId) => handleOnSelectLesson(lessonId)}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
