"use client";

import MainPage from "@/components/MainPage";
import StateLayout from "@/components/StateLayout";
import { useStateStore } from "@/stores/state.store";

export default function Home() {
  const { state } = useStateStore();

  return (
    <>
      <MainPage />
      {state !== "idle" ? <StateLayout /> : null}
    </>
  );
}
