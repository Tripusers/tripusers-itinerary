"use client";

import { useEffect } from "react";
import "./style.scss";
import { redirect } from "next/navigation";

export default function Page() {
  useEffect(() => {
    redirect("https://www.tripusers.com/");
  }, []);

  return <section id="itinerarys">Hello</section>;
}
