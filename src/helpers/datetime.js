const months = [
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
  'December'
]

export const convertToDate = (convertedDate, fullMonth) => {
  const date = new Date(convertedDate);
  const day = date.getDate();
  const year = date.getFullYear();
  if (fullMonth) {
    const month = months[date.getMonth()];
    return `${day}. ${month} ${year}`;
  } else {
    const month = date.getMonth() + 1;
    return `${day}. ${month}. ${year}`;
  }
}

export const convertToTime = (convertedDate) => {
  const date = new Date(convertedDate);
  const hours = date.getHours();
  const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hours}:${minutes}`;
};

export const convertDatetime = (cDate) => {
  const convertedDate = convertToDate(cDate, false);
  const convertedTime = convertToTime(cDate);
  return `${convertedTime} ${convertedDate}`;
}

/**
 * Return 0 if given date is toda
 * Return 1 if given date is in future
 * Return -1 if given date is in past
 * @param {Date} date 
 * @returns int
 */
export const calcDate = (date) => {
  const today = new Date();
  if (date.getFullYear() > today.getFullYear()) {
    return 1;
  } else if (date.getFullYear() < today.getFullYear()) {
    return -1;
  }

  if (date.getMonth() > today.getMonth()) {
    return 1;
  } else if (date.getMonth() < today.getMonth()) {
    return -1;
  }

  if (date.getDate() > today.getDate()) {
    return 1;
  } else if (date.getDate() < today.getDate()) {
    return -1;
  }

  return 0;
}