import http from "./http-config";

export const createCalendar = async () => {
  const {
    data: { calendar },
  } = await http.post(`/api/calendar`);
  return calendar;
};

export const createCalendarEvent = async (calendarId, event) => {
  const {
    data: { calendar },
  } = await http.post(`/api/calendar/${calendarId}`, event);
  return calendar;
};
