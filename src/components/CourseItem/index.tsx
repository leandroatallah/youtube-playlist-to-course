"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Course } from "@/models/course.model";
import { getProgress } from "@/utils/get-pregress";

import { Button } from "../Button";
import Modal from "../Modal";
import styles from "./CourseItem.module.css";

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
    <div className={styles.container}>
      <div>
        <div
          className={styles.thumbnail}
          onClick={handlePushToDetail}
          style={{
            backgroundImage: `url(${data.thumbnailUrl})`,
          }}
        />
      </div>
      <div className={styles.content} onClick={handlePushToDetail}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.progress}>Progresso: {progress}%</div>
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
