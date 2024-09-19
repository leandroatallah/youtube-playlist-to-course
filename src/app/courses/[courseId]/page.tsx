"use client";

import { useCallback, useEffect, useState } from "react";

import { Course } from "@/models/course.model";
import VideoDetail from "@/components/VideoDetail";
import LessonList from "@/components/LessonList";
import { getCourseById, updateCurrentLesson } from "@/services/course.crud";
import { Lesson } from "@/models/lesson.model";
import {
  setLessonAsDone,
  setLessonAsUndone,
} from "@/repositories/lesson.repository";
import { useToast } from "@/context/ToastContext";

const CourseDetail = ({ params }: { params: { courseId: string } }) => {
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>();

  const fetchCourse = useCallback(() => {
    setCourse(getCourseById(params.courseId));
  }, [params.courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

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

  const handleOnFinishLesson = (currentLesson: Lesson | null) => {
    if (!course || !currentLesson) {
      toast.error();
      return;
    }

    if (currentLesson.done) {
      setLessonAsUndone(course.id, currentLesson.id);
      toast("O curso foi marcado como pendente.");
    } else {
      setLessonAsDone(course.id, currentLesson.id);
      toast("O curso foi marcado como concluído.");
    }

    fetchCourse();
  };

  if (!course || !course.currentLessonId) {
    return <div>Not found</div>;
  }

  return (
    <div>
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
          <VideoDetail course={course} onFinish={handleOnFinishLesson} />
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
