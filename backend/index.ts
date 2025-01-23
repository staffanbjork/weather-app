import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import GeoService from "./src/classes/GeoService.js";
import WeatherService from "./src/classes/WeatherService.js";
import isValid from "./src/utils/isValid.js";
import { Locality } from "./src//types/types.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_FOLDER = path.join(__dirname, "../images/");
const FRONTEND_DIST_FOLDER = path.join(__dirname, "../frontend/dist");
const SERVER_PORT = process.env.SERVER_PORT || 5001;


// Static serving of images
const imageServer = express();
imageServer.use(express.static(IMAGES_FOLDER));



const geoService = new GeoService();



const app = express();
app.use(express.json());
app.use("/images", imageServer);



/**
 * Makes a request to the SMHI Open API to get weather forecast
 * for given location. If request only has coordinates, search db
 * for matching location to get name of location, municipality and 
 * county.
 */
app.get("/api/weather", async (req: Request, res: Response) => {
  const lon = req.query.lon as string;
  const lat = req.query.lat as string;
  let location: Locality[] | undefined;
  if (!isValid("longitude", lon) || !isValid("latitude", lat)) {
    res.status(400).json({ message: "Bad request" });
  }
  if (!req.query.location) {
    const longitude = parseFloat(lon);
    const latitude = parseFloat(lat);
    location = geoService.getLocalityNamesWithSorting(longitude, latitude)
  }
  const weatherService = new WeatherService(lon, lat);
  const weatherData = await weatherService.getWeatherData();
  if (!weatherData) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ weatherData, location });
})



/**
 * Returns matching locations from db, matching query string.
 */
app.get("/api/location", async (req: Request, res: Response) => {
  if (req.query.location && isValid("locality", req.query.location as string)) {
    const locality = geoService.localityQuery(req.query.location as string)
    res.status(200).json(locality);
  } else {
    res.status(400).json({message: "Bad request"})
  }
})


app.listen(SERVER_PORT, () => console.log("Server listening on port:  " + SERVER_PORT));

app.use(express.static(FRONTEND_DIST_FOLDER));
app.get("*", (_req, res) => {
  res.sendFile(path.join(FRONTEND_DIST_FOLDER, "index.html"));
})


