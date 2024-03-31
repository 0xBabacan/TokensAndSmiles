import flightData from "./flight_data.json";

const TST_CONSTANT = 1000;
export default flightData;

export async function getFlightMiles(flightNumber: string): Promise<number | undefined> {
    console.log('Getting flight miles...');
    try {
        for (const flight of flightData) {
            if (flight.flightNumber == flightNumber) {
                const miles: number = flight.miles / TST_CONSTANT;
                //console.log('earned Tokens & Smiles =', miles.toFixed(6));
                return miles;
            }
        }

        console.log('Flight not found:', flightNumber);
        return undefined;
    } catch (error) {
        console.error('Error while reading file:', error);
        throw error;
    }
}