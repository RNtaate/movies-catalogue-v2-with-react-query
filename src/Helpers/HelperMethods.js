export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const timeConverter = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const time = `${hours}HRS  ${minutes}MINS`;
  return time;
};

export const dateConverter = (date) => {
  const newDate = new Date(date);
  const finalDate = `${newDate.getDate()} ${
    months[newDate.getMonth()]
  }, ${newDate.getFullYear()}`;
  return finalDate;
};
