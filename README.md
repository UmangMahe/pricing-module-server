# pricing-module-server
Pricing Module v2 Server

## Live webpage - https://umangmahe.github.io/pricing-module-server

## Prerequisites

### Make sure Mongodb and Node.js is configured properly
1) Clone this repository - (`git clone https://github.com/UmangMahe/pricing-module-server.git`)
2) There are two folders:
   a. server - This contains all the backend logic and apis developed using Express.js
   b. web - The dashboard panel to maintain the data and perform operations
3) Each folder has its own node_modules so make sure to run `$ npm i --force` on the terminal within the respective folder to install the packages before running.
4) This project uses the MongoDB database for data storage
   
## Configuration

A. server Folder -
   
1) Rename the `.env.example` file to `.env`
2) The default PORT is `3002`.
3) Add the url of the Mongodb database to the `MONGODB_URI` variable
4) Add `JWT_SECRET`, it can be any arbitrary value
5) Open terminal from `server` and type - `$ npm run dev`. This will run the server.js and try connecting with the database.
6) Once connected, open web browser and go to - `http://localhost:<YOUR_PORT_NUMBER>/api/v1` - A welcome message will greet you.

#### Make sure to only change the PORT of your desired choice and not configuring it until required (default: 3002)

B. web Folder -

1) Head on to `src/config/EnvironmentConfig.js`
2) Change `API_ENDPOINT_URL` to the url of the above `server` (`Default: http://localhost:3002/api/v2`) with your PORT number (default: `3002`)
3) Make sure to change the endpoint url in the `prod` variable to an https:// hosted server. During the build the endpoint url in the prod variable will be considered as default so it is recommended to not use 'localhost' or 'http://' as endpoints.
4) In the terminal, type - `$ npm run build` This will generate a production build of the application ready for deployment.
5) To run the build, in the terminal, type - `$ npm run preview`
6) Click on Network link on the terminal to open the browser

