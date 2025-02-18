import { heroInfo } from "@/sanity/types/heroInfo";
import "./style.scss";

const HeroInfo = ({ dataInfo }: { dataInfo: heroInfo[] }) => {
  return (
    <section id="HeroInfo">
      <div className="info_container">
        <div className="line"></div>
        <div className="info_container_info">
          {dataInfo.map((item, index) => (
            <div key={index} className="info">
              <img src={item.icon} alt="icon" width={20} height={20} />
              <p>
                {item.title}
                <span>{item.subtitle}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="explore">
          Explore with Tripusers.com, where extraordinary adventures await.
        </p>
      </div>
    </section>
  );
};

export default HeroInfo;
