export const ENV = {
    POOL_NAME: 'LottoNonce',
    SUPPORT_EMAIL: "support@lottononce.com",
    POOL_URL: 'https://lottononce.com',
    STRATUM_URL: 'lottononce.com',
    FOUNDATION_API_BASE: 'https:///api/v1',

    BLOCK_REWARD: 6.25,  // BTC current block reward
    BLOCK_TIME_IN_SECONDS: 600, // 10 minutes for BTC
    BLOCK_TIME_UNIT: 'minutes',
    BLOCK_TIME_UNIT_DIVIDER: 60,// to make seconds minutes in template

    BLOCK_EXPLORER_URL: 'https://',

    // Convert Hash to Petahash by dividing it by 1 trillion -->
    HASHRATE_DISPLAY_MULTIPLIER: 1000 ** 5,
    HASHRATE_DISPLAY_UNIT: 'PH/s',

    WORKER_HASHRATE_DISPLAY_UNIT: 'MH/s',
    WORKER_HASHRATE_DISPLAY_MULTIPLIER: 1000 ** 2,

    // API limiter's error string, leave as is
    LIMITER_ERROR_TEXT: 'Unexpected token T in JSON at position 0',
}
