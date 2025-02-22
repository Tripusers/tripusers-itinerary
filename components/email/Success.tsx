"use client";

import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import "./style.scss";
import { useEffect, useRef } from "react";
import { useSuccessPop } from "@/providers/SuccessPop";
import ImageSize from "@/utils/image-utils";

const Success = (props: { text: string }) => {
  const { changeState } = useSuccessPop();
  const ContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const boxClose = (e: any) => {
      if (e.target.id == ContainerRef.current?.id) {
        changeState(false);
      }
    };
    document.addEventListener("mousedown", boxClose);
    return () => {
      document.removeEventListener("mousedown", boxClose);
    };
  }, []);

  return (
    <div id="successPopup" ref={ContainerRef}>
      <div className="success-card">
        <div className="bg">
          <Image
            src="https://i.postimg.cc/rw6Mf66s/Doodle-2-2x.png"
            alt="bg"
            fill
            sizes={ImageSize.card}
          />
        </div>
        <button onClick={() => changeState(false)}>
          <AiFillCloseCircle />
        </button>
        <div className="icon-container">
          <div className="icon">
            <Image
              src="https://i.postimg.cc/fTymq709/tick.gif"
              alt="tick"
              fill
              sizes={ImageSize.card}
            />
          </div>
        </div>
        <div className="text">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
