# Fullstack Weather App

This is a fullstack project written in TypeScript. 
The main focus of this project has been to find solutions to any problems encountered and find new and exciting ways of doing thing.
A lot of trial and error which has led to me learning a lot during this process.

## Frontend
The frontend is made with React and React-Bootstrap for ease of development. This project also utilizes the Vanta.js library for implementing an interactive 3D background which changes along with the weather. Some simple css animations with a touch of JS also brings rain, snow, sleet and thunder to the mix for a fully interactive UX. Meters/Gauges for visualizing some of the weather data is made from scratch by using svg´s.
A lot of experimenting has gone in to the UI/UX, still not perfect but a lot more creative then most weather app projects out there.

Functionality of the frontend is mainly based upon the use of the browsers Navigator API, where I make use of the geolocation function to get the users coordinates. As a fallback in the case of the user declining permission to use geolocation then a request is sent to [IP-API.com](https://ip-api.com/) to retrieve coordinates. When coordinates are recieved they are used to get the weather data from the backend. Then different parsing functions for different views are used to get the right data and right UI representation of data. These functions and views has been separated and lazy loading is used to better the performance at least a little bit.

## Backend
The backend is made with Express where i have gone the OOP way using a lot of classes.
The backends main concern is to fetch and parse data of the weather forecast fetched from [SMHI´s Open Data API](https://opendata.smhi.se/). The response from this API is a ten day weather forecast spread over about 75-80 time intervals. To request this data only coordinates can be used therefore the need of geolocalization. When using the browsers geolocator, coordinates are gathered but no other information. Therefore I have added a SQLite database of a dataset of swedish localitys, with name of location, municipality and county to be used for reverse geocoding. This makes it possible to get name of the users location along with the gathered weather data. The reverse geocoding uses mathematical formulations directly in the sql query to get a first estimation and then uses the haversine formula/function to get accurate distance and sort the results accordingly.

The SMHI´s API does not provide times for sunrise, sunset or solar noon which got me dissapointed due to the fact that my ideas of creating an interactive UI/UX based on current weather and day/night/twilight was in need of those parameters. So i decieded to sort this out on my own, which was easier said than done to be honest. After a lot of reaserch and some trial and error I got this functionality up and running. I based it on the [NOAA Solar Calculator](https://gml.noaa.gov/grad/solcalc/index.html) but found that it had to be tweaked to get it matching the longer durations of twilight at these latitudes. A lot and I mean a lot of trial and error went into this endeavor but I got it to work perfectly.

## Summary
There are still some fixes need to be done to the UI to get it fully responsive and to look really good on all devices. 
Performance is probably the biggest drawback of this project, the interactive background using Vanta is not something you should use when performance is important. I have looked in to some possible solutions to this where one is the use of a webworker so that the animation can run in its own thread which will probably help alot. I´ll maybe implement this later on, but this is it for now.

## Dependencies
- [React](https://www.npmjs.com/package/react)
- [React-router](https://www.npmjs.com/package/react-router-dom)
- [React-bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [Bootstrap](https://www.npmjs.com/package/bootstrap)
- [Express.js](https://www.npmjs.com/package/express)
- [Better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [Axios](https://www.npmjs.com/package/axios)
- [Tanstack-react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [Vanta](https://www.npmjs.com/package/vanta)
- [THREE](https://www.npmjs.com/package/three)

## Run
```
npm install
npm start
