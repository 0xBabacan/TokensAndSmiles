import axios from 'axios';

const AVIATIONSTACK_API_KEY = '8a095f61baf594b833c6697b21cf51e5';
//airportgap api key -> SXUeyNS3us344AN7eyg6HYrV

// https://airportgap.com/docs
export async function getDistanceInMiles(departureAirport: string, arrivalAirport: string) {
  try {
    const response = await axios.post('https://airportgap.com/api/airports/distance', {
      from: departureAirport,
      to: arrivalAirport
    });

    console.log('Distance:', response.data["data"]["attributes"]["miles"]);
    return response.data["data"]["attributes"]["miles"];
    } catch (error: any) {
        if (error.response) {
            console.error('HTTP error:', error.response.status);
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

export async function getFlightMiles(flightNumber: string): Promise<any> {
    try {
        console.log('Tokens & Smiles calculating...');
        const distanceInMiles = await getDistanceInMiles("IST", "ECN");
        return (distanceInMiles / 1000).toFixed(6);

        const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${AVIATIONSTACK_API_KEY}&flight_iata=${flightNumber}`);
        const flightData = response.data["data"];

        if (flightData && flightData.length > 0) {
            const distanceInMiles = await getDistanceInMiles(flightData[0].departure.iata, flightData[0].arrival.iata);
            console.log('earned Tokens & Smiles =', (distanceInMiles / 1000).toFixed(6));
            return (distanceInMiles / 1000).toFixed(6);
        } else {
            console.log('No flight found!');
        }
    } catch (error: any) {
        if (error.response) {
            console.error('HTTP Error:', error.response.status);
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}
// THIS PART WILL BE REMOVED
//&flight_date=2024-02-05
//const flightNumber = 'PC1071';
/*
const API_KEY = '8a095f61baf594b833c6697b21cf51e5';

async function getFlightInfo(flightNumber: string): Promise<any> {
    try {
        const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_date=2024-02-05&flight_iata=${flightNumber}`);

        const flightData = response.data;

        if (flightData.data && flightData.data.length > 0) {
            return flightData.data[0];
        } else {
            console.log('No flight found!');
        }
    } catch (error) {
        console.log('Error while getting flight info ');
    }
}

getFlightInfo(flightNumber)
    .then((flightInfo) => {
        console.log('Uçuş Bilgileri:');
        console.log('Havayolu Şirketi:', flightInfo.airline.iata);
        console.log('Kalkış Havaalanı:', flightInfo.departure.airport);
        console.log('Kalkış Havaalanı Kodu:', flightInfo.departure.iata);
        console.log('Varış Havaalanı:', flightInfo.arrival.airport);
        console.log('Varış Havaalanı Kodu:', flightInfo.arrival.iata);
        console.log('Kalkış Saati:', flightInfo.departure.scheduled);
        console.log('Varış Saati:', flightInfo.arrival.scheduled);
    })
    .catch((error) => {
        console.error(error.message);
    });

*/