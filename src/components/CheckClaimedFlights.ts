/*
import fs from 'fs';

const jsonFilePath = 'claimed_flights.json';

export function checkClaimedFlights(address: string, flightNumber: string): boolean {
    fs;
	console.log('Checking claimed address & flight number pairs...');
    if (fs.existsSync(jsonFilePath)) {
        const data = fs.readFileSync(jsonFilePath, 'utf-8');
        const jsonData = JSON.parse(data);

        for (const item of jsonData) {
            if (item.address === address && item.flightNumber === flightNumber) {
                return true;
            }
        }
    } else {
        fs.writeFileSync(jsonFilePath, '[]', 'utf-8');
        return false;
    }
}
*/
const STORAGE_KEY = 'claimed_flights';

export function checkClaimedFlights(address: string, flightNumber: string): boolean {
    console.log('Checking claimed address & flight number pairs...');
    const claimedFlights = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    for (const item of claimedFlights) {
        if (item.address === address && item.flightNumber === flightNumber) {
            console.log('You already claimed your rewards!');
            return true;
        }
    }
    return false;
}
