"use client";

import { useRouter } from "next/navigation";

import { Course } from "@/models/course.model";
import { Button } from "./Button";
import { useMemo } from "react";
import { getProgress } from "@/utils/get-pregress";

type CourseItemProp = {
  data: Course;
  onDeleteCourse: () => void;
};

const CourseItem = ({ data, onDeleteCourse }: CourseItemProp) => {
  const router = useRouter();

  const handlePushToDetail = () => router.push(`/courses/${data.playlistId}`);

  const progress = useMemo(() => getProgress(data.lessons), [data.lessons]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 120,
          height: 67.5,
          backgroundColor: "rgba(124, 124, 124, 0.5)",
          backgroundImage: `url(${data.thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
          borderRadius: 4,
        }}
        onClick={handlePushToDetail}
      />
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 6,
          }}
          onClick={handlePushToDetail}
        >
          {data.title}
        </div>
        <div
          style={{
            fontSize: 14,
            color: "#CECECE",
          }}
        >
          Progresso: {progress}%
        </div>
      </div>
      <div>
        <Button
          type="button"
          style={{
            padding: 4,
            fontSize: 12,
            height: "auto",
          }}
          variant="outline"
          onClick={onDeleteCourse}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CourseItem;
