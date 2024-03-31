import axios from 'axios';

const TST_CONSTANT = 1000;
const AVIATIONSTACK_API_KEY = '8a095f61baf594b833c6697b21cf51e5';

// https://airportgap.com/docs
export async function getDistanceInMiles(departureAirport: string, arrivalAirport: string) {
  try {
    const response = await axios.post('https://airportgap.com/api/airports/distance', {
      from: departureAirport,
      to: arrivalAirport
    });

    //console.log('Distance:', response.data["data"]["attributes"]["miles"]);
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
        //console.log('Tokens & Smiles calculating...');
        const distanceInMiles = await getDistanceInMiles("IST", "ECN");
        return (distanceInMiles / TST_CONSTANT).toFixed(6);

        const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${AVIATIONSTACK_API_KEY}&flight_iata=${flightNumber}`);
        const flightData = response.data["data"];

        if (flightData && flightData.length > 0) {
            const distanceInMiles = await getDistanceInMiles(flightData[0].departure.iata, flightData[0].arrival.iata);
            //console.log('earned Tokens & Smiles =', (distanceInMiles / TST_CONSTANT).toFixed(6));
            return (distanceInMiles / TST_CONSTANT).toFixed(6);
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