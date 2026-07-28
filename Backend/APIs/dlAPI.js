const axios = require("axios");
// 1a4c1a9b3cmsh42668ef5af11fa9p1d5fc7jsneb697d581b13
// a8b50d64e9msh849f7f7b68a6d0fp179753jsne0e7572901f3
const fetchDLDetails = async (drivingLicenseNumber,dateOfBirth) => {
  const options = {
    method: 'POST',
    url: 'https://driving-license-verification1.p.rapidapi.com/DL/DLDetails',
    headers: {
      'x-rapidapi-key': '1a4c1a9b3cmsh42668ef5af11fa9p1d5fc7jsneb697d581b13',
      'x-rapidapi-host': 'driving-license-verification1.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      method: 'dlvalidate',
      txn_id: '9ujh7gdhgs',
      clientid: '2222',
      consent: 'Y',
      dlnumber: `${drivingLicenseNumber}`,          // for ex rohit MH1420230052255
      dob: `${dateOfBirth}`                             // rohit >> 13-09-2005
    }
  };


  try {
    const response = await axios.request(options);
    console.log(JSON.stringify(response.data, null, 2));
    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    console.error('Error fetching DL details:', error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }
};

// fetchDLDetails(); // Call the function

module.exports = {fetchDLDetails};













