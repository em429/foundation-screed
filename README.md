# Screed for Foundation

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

![screenshot of screed](https://github.com/qirpi/foundation-screed/raw/master/screenshots/screenshot1.png)

Screed is a frontend for the amazing mining-pool software [foundation-server](https://github.com/blinkhash/foundation-server) from [blinkhash](https://github.com/blinkhash)

### Setup

#### Using docker

```bash
docker pull qirpi/foundation-screed
docker run --init --network=host qirpi/foundation-screed
```


#### Building
Make sure you have a recent nodejs version like v16. It is recommended to use a tool like `nvm` to install a specific version.


#### Made with:

-   sveltekit
-   tailwindcss + a17
