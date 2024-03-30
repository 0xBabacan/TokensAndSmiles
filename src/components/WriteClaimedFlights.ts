/*
import fs from 'fs';

interface FlightData {
    address: string;
    flightNumber: string;
}

const jsonFilePath = 'claimed_flights.json';

export function writeClaimedFlights(address: string, flightNumber: string): void {
    console.log('Writing claimed address & flight number pair...');
    let jsonData: FlightData[] = [];
    if (fs.existsSync(jsonFilePath)) {
        const data = fs.readFileSync(jsonFilePath, 'utf-8');
        jsonData = JSON.parse(data);
    }

    jsonData.push({ address, flightNumber });

    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
}
*/
const STORAGE_KEY = 'claimed_flights';

export function writeClaimedFlights(address: string, flightNumber: string): void {
    console.log('Writing claimed address & flight number pair...');
    let claimedFlights: FlightData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    claimedFlights.push({ address, flightNumber });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(claimedFlights));
}
