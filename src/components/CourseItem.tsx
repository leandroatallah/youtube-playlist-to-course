"use client";

import { useRouter } from "next/navigation";

import { Course } from "@/models/course.model";
import { Button } from "./Button";
import { useMemo, useState } from "react";
import { getProgress } from "@/utils/get-pregress";
import Modal from "./Modal";

type CourseItemProp = {
  data: Course;
  onDeleteCourse: () => void;
};

const CourseItem = ({ data, onDeleteCourse }: CourseItemProp) => {
  const router = useRouter();

  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);

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
      <div>
        <div
          style={{
            width: 160,
            paddingBottom: "56.25%",
            backgroundColor: "rgba(124, 124, 124, 0.5)",
            backgroundImage: `url(${data.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 4,
            cursor: "pointer",
          }}
          onClick={handlePushToDetail}
        />
      </div>
      <div
        style={{
          flex: 1,
          cursor: "pointer",
        }}
        onClick={handlePushToDetail}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 6,
          }}
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
          onClick={() => setShowConfirmDeletion(true)}
        >
          Remove
        </Button>
      </div>
      {showConfirmDeletion && (
        <Modal title="Remover curso">
          <div>Tem certeza que deseja remover o curso?</div>
          <Button onClick={onDeleteCourse}>Remover curso</Button>
          <Button
            variant="outline"
            onClick={() => setShowConfirmDeletion(false)}
          >
            Cancelar
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default CourseItem;
