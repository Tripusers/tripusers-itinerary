import Image from "next/image";
import "./pageLoading.scss";
import ImageSize from "@/utils/image-utils";

const logo =
  "https://i.postimg.cc/X7BSCsqN/tripusers-com-Logo-Iconsahil-low.png";

const PageLoading = () => {
  return (
    <section id="PageLoading">
      <div className="img-container">
        <Image src={logo} alt="logo" fill sizes={ImageSize.card} />
      </div>
      <div className="loader-container">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <p>LOADING</p>
    </section>
  );
};

export default PageLoading;
