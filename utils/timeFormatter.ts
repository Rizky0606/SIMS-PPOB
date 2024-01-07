const timeFormatter = (date: any) => {
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (minute < 10) {
    minute = `0${minute}`;
  } else if (hour < 10) {
    minute = `0${hour}`;
  }

  return `${hour}.${minute} WIB`;
};

export default timeFormatter;
