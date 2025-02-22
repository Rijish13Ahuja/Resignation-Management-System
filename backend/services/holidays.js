const axios = require('axios');

const checkHoliday = async (country, date) => {
  try {
    const year = new Date(date).getFullYear();
    const response = await axios.get('https://calendarific.com/api/v2/holidays', {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY,
        country,
        year,
        type: 'national'
      }
    });
    
    return response.data.response.holidays.some(holiday => 
      new Date(holiday.date.iso).toDateString() === new Date(date).toDateString()
    );
  } catch (error) {
    console.error('Holiday check failed:', error);
    return false;
  }
};

module.exports = checkHoliday;