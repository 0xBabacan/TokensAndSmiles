const STORAGE_KEY = 'claimed_flights';

export function writeClaimedFlights(address: string, flightNumber: string): void {
    //console.log('Writing claimed address & flight number pair...');
    let claimedFlights: FlightData[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    claimedFlights.push({ address, flightNumber });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(claimedFlights));
}
