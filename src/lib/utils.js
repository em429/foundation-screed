// Utility functions

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
