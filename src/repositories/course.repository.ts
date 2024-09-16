import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/database/localStorage";
import { Course, CoursePayload } from "@/models/course.model";

// const currentStorage = localStorageService;

type CreateStatus = {
  status: 201 | 400 | 409;
};

export const getById = (courseId: string): Course | undefined => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return;
  }

  const { courses } = data;

  return courses.find((item: Course) => item.id === courseId);
};

export const getAll = (): Course[] | undefined => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return;
  }

  return data.courses;
};

export const create = (course: CoursePayload): CreateStatus => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return {
      status: 400,
    };
  }

  const courseId = course.playlistId;

  const isDuplicated = data.courses.some((course) => course.id === courseId);
  if (isDuplicated) {
    return {
      status: 409,
    };
  }
  const lessons = course.lessons.map((lesson) => ({
    ...lesson,
    id: lesson.videoId,
  }));

  setDataToLocalStorage({
    ...data,
    courses: [...data.courses, { ...course, id: courseId, lessons }],
  });

  return { status: 201 };
};

export const remove = (courseId: string) => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return {
      status: 400,
    };
  }

  const exists = data.courses.some((course) => course.id === courseId);

  if (!exists) {
    return {
      status: 404,
    };
  }

  setDataToLocalStorage({
    ...data,
    courses: data.courses.filter((course) => course.id !== courseId),
  });

  return {
    status: 202,
  };
};
