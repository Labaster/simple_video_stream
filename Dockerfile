FROM node:14.19.1 AS build

# Copying necessary folders and files
# Install  dependencies
COPY package.json .
COPY yarn.lock .
COPY index.js .

COPY controllers controllers
COPY public public
COPY routes routes
COPY view view
COPY videos videos
COPY helpers helpers
RUN yarn install --frozen-lockfile --ignore-optional
RUN yarn install --frozen-lockfile --ignore-optional --prod=true

FROM node:14.19.1-alpine
# Create app directory
RUN mkdir /app
WORKDIR /app
COPY --from=build package.json package.json
COPY --from=build index.js index.js
COPY --from=build yarn.lock yarn.lock
COPY --from=build controllers controllers
COPY --from=build node_modules node_modules
COPY --from=build public public
COPY --from=build routes routes
COPY --from=build view view
COPY --from=build helpers helpers
COPY --from=build videos videos

EXPOSE 5000
CMD NODE_ENV=production PORT=3000 node index.js
