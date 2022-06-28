export async function get() {
    const toBool = (variable) => {
        if (variable && variable.toLowerCase() === "true") {
            return true;
        }
        return false;
    }
    
    return {
        body: {
            SCD_ENVIRONMENT: process.env["SCD_ENVIRONMENT"] || "development",
            SCD_POOL_NAME: process.env["SCD_POOL_NAME"] || "fresh screed mining pool",
            SCD_POOL_FRONTEND_URL: process.env["SCD_POOL_FRONTEND_URL"] || "localhost",
            SCD_FOUNDATION_API_BASE: process.env["SCD_FOUNDATION_API_BASE"] || '127.0.0.1:3001/api/v1',
            SCD_STRATUM_URL: process.env["SCD_STRATUM_URL"] || "lottononce.com",
            SCD_POOL_CARD_TITLE: process.env["SCD_POOL_CARD_TITLE"] || "Pool",
            SCD_SUPPORT_EMAIL: process.env["SCD_SUPPORT_EMAIL"] || "support@example.com",

            SCD_ENABLE_TRANSACTIONS_TAB: toBool(process.env["SCD_ENABLE_TRANSACTIONS_TAB"]) || false,
            
            // Shared or solo pool?
            // 	  Setting to false will hide the fields that don't make sense
            // 	  on a solo pool.
            //
            // 	  TODO: create a writeable store for triggering between solo/shared by default
            // 	        and add a config option to make pool solo or shared only
            SCD_POOL_SHARED: toBool(process.env["SCD_POOL_SHARED"]) || false,

            SCD_DEFAULT_COIN_ENDPOINT: process.env["SCD_DEFAULT_COIN_ENDPOINT"] || "/Bitcoin",

            // Whether to hide blocks card or not
            // Useful for solo pools, or pools just starting wishing to hide an empty
            // block list.
            SCD_HIDE_BLOCKS_CARD: toBool(process.env["SCD_HIDE_BLOCKS_CARD"]) || true,

            // Default: BTC current block reward
            SCD_BLOCK_REWARD: parseFloat(process.env["SCD_BLOCK_REWARD"]) || 6.25,

            // Default: BTC, 10 minutes
            SCD_BLOCK_TIME_IN_SECONDS: parseInt(process.env["SCD_BLOCK_TIME_IN_SECONDS"]) || 600,
            SCD_BLOCK_TIME_UNIT: process.env["SCD_BLOCK_TIME_UNIT"] || 'minutes',
            // Default: seconds to minutes in template
            SCD_BLOCK_TIME_UNIT_DIVIDER: parseInt(process.env["SCD_BLOCK_TIME_UNIT_DIVIDER"]) || 60,

            SCD_BLOCK_EXPLORER_URL: process.env["SCD_BLOCK_EXPLORER_URL"] || 'https://blockchain.com/btc/block',
            SCD_TX_EXPLORER_URL: process.env["SCD_TX_EXPLORER_URL"] || 'https://blockchain.com/btc/tx',

            // Convert Hash to Petahash by dividing it by 1 trillion -->
            SCD_NETWORK_HASHRATE_DISPLAY_UNIT: process.env["SCD_NETWORK_HASHRATE_DISPLAY_UNIT"] || 'petahash',
            SCD_POOL_HASHRATE_DISPLAY_UNIT: process.env["SCD_POOL_HASHRATE_DISPLAY_UNIT"] || 'megahash',
            SCD_WORKER_HASHRATE_DISPLAY_UNIT: process.env["SCD_WORKER_HASHRATE_DISPLAY_UNIT"] || 'megahash',

            // API limiter's error string, leave as is
            SCD_LIMITER_ERROR_TEXT: process.env["SCD_LIMITER_ERROR_TEXT"] || 'Unexpected token T in JSON at position 0',
        }
    }
}
