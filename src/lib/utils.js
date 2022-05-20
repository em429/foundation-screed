// Utility functions

import { ENV } from '$lib/env.js'

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


export function handleError(error) {
        let error_type
    	if (error.message === ENV.LIMITER_ERROR_TEXT) {
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
