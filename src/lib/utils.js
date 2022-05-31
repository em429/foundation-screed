// Utility functions

export function handleError(error, errortext) {
        let error_type = 'unknown'
    	if (error.message === "Unexpected token T in JSON at position 0") {
    		error_type = 'limiter'
        // TODO: make api error an explicit check for it not being available
        // TODO: add else clause and error_type = 'unknown'
    	} else {
    		error_type = 'api'
    	}

    	return {
        	message: error.message,
        	type: error_type,
    	}
    }


// Return the average of all values on an array
export const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length

// Returns a Promise with a timeout set in miliseconds
export const timeout = (prom, time, exception) => {
    let timer
    return Promise.race([
        prom,
        new Promise((_r, rej) => (timer = setTimeout(rej, time, exception))),
    ]).finally(() => clearTimeout(timer))
}


export function getHashrateMultiplier(unit_long_name) {
        if (unit_long_name === 'petahash') {
            return {
               multiplier: 1000 ** 5, // 1 trillion
               unit_short_name: "PH/s",
            }
        } else if (unit_long_name === 'terrahash') {
            return {
               multiplier: 1000 ** 4, // 1 billion
               unit_short_name: "TH/s",
            }
        } else if (unit_long_name === 'gigahash') {
            return {
               multiplier: 1000 ** 3, // 100 million
               unit_short_name: "GH/s",
            }
        } else if (unit_long_name === 'megahash') {
            return {
               multiplier: 1000 ** 2, // 1 million
               unit_short_name: "MH/s",
            }
        } else if (unit_long_name === 'kilohash') {
            return {
               multiplier: 1000,
               unit_short_name: "KH/s",
            }
        }
        return {
            multiplier: 1,
            unit_short_name: 'H/s',
        }
    }
