import {
  clearLocalStorage,
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/database/localStorage";
import { Course, CoursePayload } from "@/models/course.model";
import { fetchYoutubePlaylistAndItems } from "@/services/youtube-data-api";

// const currentStorage = localStorageService;

type CreateStatus = {
  status: 201 | 400 | 409;
};

export type ImportData = {
  data: {
    curr: string;
    id: string;
    prg: string[];
  }[];
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

  const currentLessonId = lessons.length ? lessons[0].id : null;

  setDataToLocalStorage({
    ...data,
    courses: [
      ...data.courses,
      { ...course, id: courseId, lessons, currentLessonId },
    ],
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

export const exportAll = () => {
  const data = getDataFromLocalStorage();

  if (!data) {
    return {
      status: 400,
    };
  }

  return {
    status: 200,
    data: data.courses.map((course) => ({
      id: course.playlistId, // playlistId
      curr: course.currentLessonId, // currentLessonId
      prg: course.lessons // progress
        .filter((lesson) => lesson.done)
        .map((lesson) => lesson.id),
    })),
  };
};

export const importAll = async ({ data }: ImportData) => {
  const courseIdList: string[] = [];

  data.forEach((course) => {
    courseIdList.push({
      id: course.id,
    });
  });

  await Promise.all(
    courseIdList.map((course) => fetchYoutubePlaylistAndItems(course.id)),
  )
    .then((result) => {
      clearLocalStorage();
      result.forEach((course) => create(course));
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    status: 201,
  };
};
