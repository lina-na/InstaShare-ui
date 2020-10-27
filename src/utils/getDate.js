const fixTimeFormat = (value) => (+value < 10 ? `0${value}` : value);

const getDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timePeriod = hours < 12 ? "AM" : "PM";

  return `${day}/${month}/${year} ${fixTimeFormat(hours)}:${fixTimeFormat(
    minutes
  )} ${timePeriod}`;
};

export default getDate;
