import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/database/localStorage";
import { getCourseById } from "@/services/course.crud";

// const currentStorage = localStorageService;

export const setCurrentLesson = (courseId: string, lessonId: string) => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return {
      status: 400,
    };
  }

  const course = getCourseById(courseId);

  if (!course) {
    return {
      status: 400,
    };
  }

  setDataToLocalStorage({
    ...data,
    courses: data.courses.map((course) => {
      if (course.id !== courseId) return course;

      return {
        ...course,
        currentLessonId: lessonId,
      };
    }),
  });

  return { status: 201 };
};

const updateLessonStatus = (
  courseId: string,
  lessonId: string,
  toDone: boolean,
) => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return {
      status: 400,
    };
  }

  const course = getCourseById(courseId);

  if (!course) {
    return {
      status: 400,
    };
  }
  setDataToLocalStorage({
    ...data,
    courses: data.courses.map((course) => {
      if (course.id !== courseId) return course;

      const lessons = course.lessons.map((lesson) => {
        if (lesson.id !== lessonId) {
          return lesson;
        }

        return {
          ...lesson,
          done: toDone,
        };
      });

      return {
        ...course,
        lessons,
      };
    }),
  });

  return { status: 201 };
};

export const setLessonAsDone = (courseId: string, lessonId: string) => {
  return updateLessonStatus(courseId, lessonId, true);
};

export const setLessonAsUndone = (courseId: string, lessonId: string) => {
  return updateLessonStatus(courseId, lessonId, false);
};
