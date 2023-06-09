import moment from "moment";

export function convertDate(fecha: string): string {
  return moment(fecha).format('DD/MM hh:mm A');
}

export function getDayName(forecastDate: string) {
  let dateForecast = moment(forecastDate);
  let dayForecast = dateForecast.day();
  let todayDate = moment();
  let todayDay = todayDate.day();

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  return todayDay === dayForecast ? "Today" : days[dayForecast];
}

export function showErrorMessage(message: string, alertBox: HTMLElement) {
  alertBox.innerHTML = message;
  alertBox.classList.toggle("disabled");
  setTimeout(() => {
    alertBox.classList.toggle("disabled");
  }, 3000);
}