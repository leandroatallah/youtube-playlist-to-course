"use client";

import { Button } from "@/components/Button";
import { useToast } from "@/context/ToastContext";

import styles from "../page.module.css";

export default function Home() {
  const { toast } = useToast();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Utemy</h1>
        <Button onClick={() => toast("OLHA só!")}>append toast</Button>
      </main>
    </div>
  );
}
