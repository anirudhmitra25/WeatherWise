const formatLocalTime = (localtime: string) => {
  const date = new Date(localtime);
  const day = date.getDate().toString();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${day}${ordinalSuffix(day)} ${month} ${year}, ${hour}:${minute}`;
};
const ordinalSuffix = (day: string) => {
  const dayInt = parseInt(day);
  if (dayInt >= 11 && dayInt <= 13) {
    return "th";
  }
  switch (dayInt % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default formatLocalTime;
