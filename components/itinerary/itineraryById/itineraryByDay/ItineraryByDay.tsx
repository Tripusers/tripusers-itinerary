import ImageFadeSlider from "@/components/ui/Slider/ImageFadeSlider";
import "./style.scss";
import { Itinerary } from "@/sanity/types/itinerary";
import {
  CalendarRange,
  ChevronDown,
  Moon,
  Sun,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import Acccordion from "@/components/ui/Acccordion";
import { PortableText } from "@portabletext/react";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import { TbAirBalloon } from "react-icons/tb";

type ItineraryStatus =
  | "Completed"
  | "Expired"
  | "Traveling"
  | "Not Accepted"
  | "Upcoming"
  | "Pending";

interface StatusMessage {
  [key: string]: { primary: string; secondary: string };
}

const STATUS_MESSAGES: StatusMessage = {
  Completed: {
    primary: "Thank you for choosing",
    secondary: "TripUsers.com",
  },
  Expired: {
    primary: "This Quotation Is Expired",
    secondary: "Please Request A New One!",
  },
  Traveling: {
    primary: "Your Itinerary is confirmed",
    secondary: "Happy Traveling!",
  },
  "Not Accepted": {
    primary: "This Quotation Is Expired",
    secondary: "Please Request A New One!",
  },
  Upcoming: {
    primary: "Your Itinerary is confirmed",
    secondary: "Happy Traveling!",
  },
  Pending: {
    primary: "Your confirmation is pending",
    secondary: "Please contact us for confirmation",
  },
};

const getIncrementedDate = (baseDate: string, increment: number): string => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + increment);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const TravelDuration: React.FC<{ days: number; nights?: number }> = ({
  days,
  nights,
}) => (
  <div className="day_night_container">
    <p>
      {nights && (
        <>
          {nights}N <Moon /> {" | "}
        </>
      )}
      {days}D <Sun />
    </p>
  </div>
);

const FareBreakdown: React.FC<
  Pick<Itinerary, "fareBreakup" | "price" | "priceActual">
> = ({ fareBreakup, price, priceActual }) => (
  <>
    <div className="breakup">
      <div className="per_adult one">
        <p>Per Adult</p>
        <p>₹ {fareBreakup.perAdult}</p>
      </div>
      {fareBreakup.perChild && (
        <div className="per_child one">
          <p>Per Child</p>
          <p>₹ {fareBreakup.perChild}</p>
        </div>
      )}
      {fareBreakup.perInfant && (
        <div className="per_infant one">
          <p>Per Infant</p>
          <p>₹ {fareBreakup.perInfant}</p>
        </div>
      )}
    </div>
    <div className="tax">
      <p>
        TCS Tax @ {fareBreakup.tax}% ({fareBreakup.tax.toFixed(1)}%)
      </p>
      <p>₹ {fareBreakup.taxAmount}</p>
    </div>
    <div className="total">
      <p>Trip Total</p>
      <p className="price">
        <span>₹ {priceActual}</span>
        <span className="price_total">₹ {price}</span>
      </p>
    </div>
  </>
);

const StatusInfo: React.FC<{ status: ItineraryStatus }> = ({ status }) => (
  <div className={`${status.toLowerCase().replace(" ", "_")} status_info`}>
    <p>
      <span>{STATUS_MESSAGES[status].primary}</span>
      <span>{STATUS_MESSAGES[status].secondary}</span>
    </p>
  </div>
);

const ItineraryByDay: React.FC<{ data?: Itinerary }> = ({ data }) => {
  const [isOpenMain, setIsOpenMain] = useState<number[]>([0]);
  const [secondaryStates, setSecondaryStates] = useState<{
    [key: number]: number[];
  }>({});

  if (!data) {
    return (
      <section id="ItineraryByDay">
        <p>no data found</p>
      </section>
    );
  }

  const status = useMemo(() => {
    const start = new Date(data.date);
    const end = new Date(data.date);
    end.setDate(end.getDate() + data.days);
    const current = new Date();

    if (current > end) {
      return data.clientAccepted ? "Completed" : "Expired";
    }

    if (current >= start && current <= end) {
      return data.clientAccepted ? "Traveling" : "Not Accepted";
    }

    if (current < start) {
      return data.clientAccepted ? "Upcoming" : "Pending";
    }

    return "Upcoming";
  }, [data.date, data.days, data.clientAccepted]) as ItineraryStatus;

  return (
    <section id="ItineraryByDay">
      <div className="title_container">
        <h1>
          <span>Itinerary</span>
          <span>You'll Love</span>
        </h1>
      </div>

      <div className="itinerary_heading">
        <h2>
          <span className="client_name_container">
            <span>{data.clientName}'s</span>{" "}
            <span>{data.days} Days trip to</span>
          </span>{" "}
          <span className="place">{data.tripTo}</span>
        </h2>
        <TravelDuration days={data.days} nights={data.nights} />
      </div>

      <div className="itinerary_main">
        <div className="left">
          <div className="images_container">
            <ImageFadeSlider
              images={data.placeImages}
              settings={{ fade: false }}
              index
            />
            <p className="days">
              <span>{data.days} days in</span>
              <span>{data.tripTo}</span>
            </p>
          </div>
          <div className="itinerarry_days">
            <div className="itinerary_cards_container">
              <Acccordion
                titles={data.itinerary.map((item) => item.title)}
                day={data.itinerary.map((item) => item.day)}
                date={data.date}
                isOpen={isOpenMain}
                onOpenChange={setIsOpenMain}
                showAllBtn
                buttonContent={data.itinerary.map((item, i) => (
                  <div key={`${item.title}-${i}`} className="title_button">
                    <div className="calendar">
                      <CalendarIcon />
                      <div className="day_container">
                        <div className="prefix">Day</div>
                        {item.day !== undefined && (
                          <div className="day">
                            {String(item.day).padStart(2, "0")}
                          </div>
                        )}
                      </div>
                    </div>
                    <h4>
                      <span>
                        {item.date && getIncrementedDate(item.date, i)}
                      </span>
                      <span>{item.title}</span>
                    </h4>
                    <div
                      className="arrow"
                      style={{
                        transform: isOpenMain.includes(i)
                          ? "rotate(-180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <ChevronDown strokeWidth={2.5} size={20} />
                    </div>
                  </div>
                ))}
              >
                {data.itinerary.map((item, i) => (
                  <div
                    key={`${item.title}-${i}`}
                    className="itinerary_item_card"
                  >
                    <div className="desc">
                      <PortableText value={item.description} />
                    </div>
                    {item.activaties && (
                      <div className="activities_container">
                        <Acccordion
                          initialOpen={true}
                          isOpen={secondaryStates[i] || []}
                          onOpenChange={(indices) => {
                            setSecondaryStates((prev) => ({
                              ...prev,
                              [i]: indices,
                            }));
                          }}
                          buttonContent={item.activaties.map((activity, j) => (
                            <div
                              key={`${activity.title}-${j}`}
                              className="title"
                            >
                              <div className="activity_title">
                                <p>
                                  <TbAirBalloon size={14} /> Activity:
                                </p>
                                <h4>{activity.title}</h4>
                              </div>
                              <div
                                className="arrow"
                                style={{
                                  transform: (
                                    secondaryStates[i] || []
                                  ).includes(j)
                                    ? "rotate(-180deg)"
                                    : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              >
                                <ChevronDown strokeWidth={1.5} />
                              </div>
                            </div>
                          ))}
                        >
                          {item.activaties.map((activity, j) => (
                            <div
                              key={`${activity.title}-${j}`}
                              className="activaty_sec"
                            >
                              <div className="activity_img">
                                <ImageFadeSlider
                                  images={activity.images}
                                  settings={{ fade: false }}
                                  index
                                />
                              </div>
                              {activity.description && (
                                <div className="activity_desc">
                                  <PortableText value={activity.description} />
                                </div>
                              )}
                            </div>
                          ))}
                        </Acccordion>
                      </div>
                    )}
                  </div>
                ))}
              </Acccordion>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="fare_breakup">
            <div className="title">
              <h3>Fare Breakup</h3>
            </div>

            <div className="date_people">
              <div className="date">
                <CalendarRange strokeWidth={1.2} size={18} />
                <p>{formatDate(data.date)}</p>
              </div>
              <div className="people">
                <UsersRound strokeWidth={1.4} size={18} />
                <p>
                  {data.adults} Adults
                  {data.children && `, ${data.children} Children`}
                  {data.infant && `, ${data.infant} Infants`}
                </p>
              </div>
            </div>

            <FareBreakdown
              fareBreakup={data.fareBreakup}
              price={data.price}
              priceActual={data.priceActual}
            />
            <StatusInfo status={status} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryByDay;
