const STORAGE_KEY = 'claimed_flights';

export function checkClaimedFlights(address: string, flightNumber: string): boolean {
    //console.log('Checking claimed address & flight number pairs...');
    const claimedFlights = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    for (const item of claimedFlights) {
        if (item.address === address && item.flightNumber === flightNumber) {
            //console.log('You already claimed your rewards!');
            return true;
        }
    }
    return false;
}
