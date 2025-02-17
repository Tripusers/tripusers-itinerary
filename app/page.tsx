"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    redirect("https://www.tripusers.com/");
  }, []);

  return <main>Hello</main>;
}
