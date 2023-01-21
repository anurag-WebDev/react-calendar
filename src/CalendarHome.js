import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import Event from "./Event";
import "./Calendar.css";
import "./hightlight.css";

const CalendarHome = () => {
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);

  useEffect(() => {
    const events = getEvents();
    setEvents(events);
  }, []);

  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const getEvents = () => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err) {
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };

  const displayEvent = (e) => {
    const date = moment(e).format("YYYY-MM-DD");
    const newEvent = events?.filter((event) => event.start.date === date);
    setDisplayEvents(newEvent);
  };
  // console.log(events);
  return (
    <Box>
      {" "}
      <h1 className="text-2xl font-bold mb-4">
        React App with Google Calendar API!
      </h1>
      <Box>
        <Calendar
          tileClassName={(date, view) => {
            const eventsArray = events?.find(
              (event) =>
                event.start.date === moment(date.date).format("YYYY-MM-DD")
            );
            if (eventsArray) {
              return "highlight";
            }
          }}
          onChange={(e) => {
            displayEvent(e);
          }}
        ></Calendar>
      </Box>
      {/* <ul> */}
      <Box>
        <Event displayEvents={displayEvents} />
      </Box>
    </Box>
  );
};

export default CalendarHome;
