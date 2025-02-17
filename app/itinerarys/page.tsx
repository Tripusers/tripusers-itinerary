"use client";

import { getAllItinerarys } from "@/sanity/sanity-utils";
import { Itinerary } from "@/sanity/types/itinerary";
import { useEffect, useState } from "react";
import "./style.scss";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import axios from "axios";
export default function Page() {
  const router = useRouter();
  const [allItinerarys, setAllItinerarys] = useState<Itinerary[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");

  const { addToast } = useToast();

  const handleAuth = () => {
    if (pin === process.env.NEXT_PUBLIC_ACCESS_PIN) {
      setIsAuthenticated(true);
      addToast("Authenticated", "success");
    } else {
      addToast("Incorrect PIN", "error");
      setPin("");
    }
  };

  const fetchItinerarys = async () => {
    try {
      const itinerarys = await getAllItinerarys();
      setAllItinerarys(itinerarys);
    } catch (error) {
      console.error("Error fetching itinerarys: ", error);
    }
  };

  const copyMessage = (itinerary: Itinerary) => {
    const message = `Hi *${itinerary.clientName}*! 🌟

Your adventure dreams are coming true! 🎉
Check out your personalised itinerary tailored just for you. Click the link below to dive into the excitement and start planning your unforgettable journey!

🔗 ${process.env.NEXT_PUBLIC_BASE_URL}/itinerarys/${itinerary._id}

Your Travel Expert
*Risha*
Team Tripusers.com 🚀`;

    navigator.clipboard
      .writeText(message)
      .then(() => {
        addToast("Message copied to clipboard!", "success");
      })
      .catch((err) => {
        console.error("Failed to copy message:", err);
        addToast("Failed to copy message", "error");
      });
  };

  useEffect(() => {
    fetchItinerarys();
  }, []);

  const startDateFormatted = (date: string) => {
    const startDate = new Date(date);
    return startDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getItineraryStatus = (startDate: string, days: number) => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(end.getDate() + days);
    const current = new Date();

    if (current > end) {
      return "Expired";
    } else if (current >= start && current <= end) {
      return "Traveling";
    }
    return "Upcoming";
  };

  const sendWhatsAppMessage = async () => {
    const response = await axios({
      url: "https://graph.facebook.com/v22.0/601873959668159/messages",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_WHATSAPP_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        messaging_product: "whatsapp",
        to: "918983232072",
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US",
          },
        },
      }),
    });

    console.log("response: ", response.data);
  };

  console.log("allItinerarys: ", allItinerarys);

  if (!isAuthenticated) {
    return (
      <section id="itinerarys_auth">
        <div className="auth_container">
          <h1>Enter PIN</h1>
          <p>Enter the PIN to access the itinerarys</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
          />
          <button onClick={handleAuth}>Submit</button>
        </div>
      </section>
    );
  }

  if (allItinerarys.length === 0) {
    return (
      <section id="itinerarys_empty">
        <h1>Itinerarys</h1>
        <p>No itinerarys found</p>
      </section>
    );
  }

  return (
    <section id="itinerarys">
      <div className="itinerarys_header">
        <h1>Itinerarys</h1>
      </div>
      <div className="itinerarys_container">
        {allItinerarys.map((itinerary, index) => (
          <div className="itinerary_card" key={itinerary._id}>
            <div className="left">
              <h2>{itinerary.clientName}</h2>
              <p className="itinerary_trip_to">Trip to: {itinerary.tripTo}</p>
              <p className="itinerary_date">
                Date: {startDateFormatted(itinerary.date)}
              </p>
              <p className="itinerary_id">Id: {itinerary._id}</p>
              <p className="itinerary_status">
                Status: {getItineraryStatus(itinerary.date, itinerary.days)}
              </p>
            </div>
            <div className="right">
              <button
                className="itinerary_button"
                onClick={() => router.push(`/itinerarys/${itinerary._id}`)}
              >
                View
              </button>
              <button
                className="itinerary_button"
                onClick={sendWhatsAppMessage}
              >
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
