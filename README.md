# Screed for Foundation

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

![screenshot of screed](https://github.com/qirpi/foundation-screed/raw/master/screenshots/screenshot1.png)

Screed is a unofficial frontend for the amazing mining-pool software [foundation-server](https://github.com/blinkhash/foundation-server) from [blinkhash](https://github.com/blinkhash)

There is also an official frontend, currently free to use while in beta on https://blinkhash.com/

### Setup

#### Using docker

```bash
docker pull qirpi/foundation-screed
docker run --init --network=host qirpi/foundation-screed
```

#### Building from source

Make sure you have a recent nodejs version like v16. It is recommended to use a tool like `nvm` to install a specific version.

### Configuration

The available environment variables, with their default values and a short explanation is below.

```bash

   SCD_ENVIRONMENT=development
   SCD_POOL_NAME="fresh mining pool"
   SCD_POOL_FRONTEND_URL=localhost
   SCD_FOUNDATION_API_BASE="127.0.0.1:3001/api/v1"
   SCD_STRATUM_URL=lottononce.com
   SCD_POOL_CARD_TITLE=Pool
   SCD_SUPPORT_EMAIL="support@example.com"
     
   # Shared or solo pool?
   # 	  Setting to false will hide the fields that don't make sense
   # 	  on a solo pool.
   #
   # 	  TODO: create a writeable store for triggering between solo/shared by default
   # 	        and add a config option to make pool solo or shared only
   SCD_POOL_SHARED=true

   # If disabled, root route (/) will redirect to default coin
   SCD_ENABLE_LANDING_PAGE=false
   SCD_DEFAULT_COIN_ENDPOINT="/Bitcoin"

   # Whether to hide blocks card or not
   # Useful for solo pools, or pools just starting wishing to hide an empty
   # block list.
   SCD_HIDE_BLOCKS_CARD=false
   # Default: BTC current block reward
   SCD_BLOCK_REWARD=6.25

   # NOTE: This definetly could be made simpler / better
   # Default: BTC, 10 minutes
   SCD_BLOCK_TIME_IN_SECONDS=600,
   SCD_BLOCK_TIME_UNIT="minutes"
   # Default: seconds to minutes in template
   SCD_BLOCK_TIME_UNIT_DIVIDER=60

   SCD_BLOCK_EXPLORER_URL="https://blockchain.com/btc/block"
   SCD_TX_EXPLORER_URL="https://blockchain.com/btc/tx"

   # Convert Hash to Petahash by dividing it by 1 trillion -->
   SCD_NETWORK_HASHRATE_DISPLAY_UNIT=petahash
   SCD_POOL_HASHRATE_DISPLAY_UNIT=megahash
   SCD_WORKER_HASHRATE_DISPLAY_UNIT=megahash
```



#### Made with:

-   sveltekit
-   tailwindcss + a17


I'm available for support with setup for a one time fee, please reach out via support@lambd.ax
