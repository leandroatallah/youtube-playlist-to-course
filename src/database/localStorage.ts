import * as config from "@/constants/config";
import { Course } from "@/models/course.model";

type Data = {
  courses: Course[];
};

const initialDataValue: Data = {
  courses: [],
};

export const getDataFromLocalStorage = (): Data => {
  if (typeof window == undefined) {
    return initialDataValue;
  }

  const data = window.localStorage.getItem(config.LOCAL_STORAGE_KEY);

  if (!data) {
    window.localStorage.setItem(
      config.LOCAL_STORAGE_KEY,
      JSON.stringify(initialDataValue),
    );
  }

  return data ? (JSON.parse(data) as Data) : initialDataValue;
};

export const setDataToLocalStorage = (data: Data) => {
  window.localStorage.setItem(config.LOCAL_STORAGE_KEY, JSON.stringify(data));
};
