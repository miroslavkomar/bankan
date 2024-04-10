function validateDateTime(dateTime) {
  const date = new Date(dateTime);
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateTime) && date instanceof Date && !isNaN(date) ;
}

module.exports = validateDateTime;
