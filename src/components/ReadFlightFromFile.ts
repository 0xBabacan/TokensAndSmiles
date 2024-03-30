import flightData from "./flight_data.json";

export default flightData;

export async function getFlightMiles(flightNumber: string): Promise<number | undefined> {
    try {        
        for (const flight of flightData) {
            if (flight.flightNumber == flightNumber) {
                const miles: number = flight.miles / 1000;
                console.log('earned Tokens & Smiles =', miles.toFixed(6));
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

// THIS PART WILL BE REMOVED
/*
import * as fs from 'fs';

const filePath: string = 'flight_data.json';

export async function getFlightMiles(flightNumber: string): Promise<number | undefined> {
    try {
        const data: string = await fs.promises.readFile(filePath, 'utf8');
        const flights: any[] = JSON.parse(data);
        
        for (const flight of flights) {
            if (flight.flightNumber === flightNumber) {
                const miles: number = flight.miles / 1000;
                console.log('earned Tokens & Smiles =', miles.toFixed(6));
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
*/