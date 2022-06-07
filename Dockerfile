FROM node:16-slim@sha256:c51416d582339a0f9f5f8da347a2dd8b585e1f5893a627e9b3a208351493b2b4

WORKDIR /foundation-screed
RUN chown -R node:node ./
USER node

COPY src src/
COPY static static/
COPY package.json .
COPY package-lock.json .
COPY postcss.config.cjs .
COPY tailwind.config.cjs .
COPY svelte.config.js .
COPY mdsvex.config.js .
COPY tsconfig.json .

RUN npm install

ENV NODE_ENV production
RUN npm run build

CMD [ "node", "build/index.js" ]
