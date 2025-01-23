import DB from "./DB.js"

// Used to set the search radius for the db query, 0.1 is approx. 10km
const DB_SEARCH_RADIUS = 0.1;

// Used for the haversine function to calculate exact distance for the final filtering and sorting, 1 is approximately 1 km.
const SEARCH_RADIUS = 10;



export default class GeoService {
  dbSearchRadius: number;
  searchRadius: number;
  db: DB;

  constructor() {
    this.dbSearchRadius = DB_SEARCH_RADIUS;
    this.searchRadius = SEARCH_RADIUS;
    this.db = new DB();
  }

  /**
   * Using the haversine formula/function to get a more accurate distance
   * between given coordinates and match from db.
   * @param lat1 Latitude of given position.
   * @param lon1 Longitude of given position.
   * @param lat2 Latitude of location from db.
   * @param lon2 Longitude of location from db.
   * @returns Distance between given coordinates and coordinates of 
   * location in db.
   */
  #calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Queries db with coordinates to find locality name,
   * uses DB_SEARCH_RADIUS to find positions in the set proximity.
   * Then uses the haversine function to calculate precise distance 
   * and sort results from nearest to farthest.
   * @param lon Longitude
   * @param lat Latitude
   * @returns List of locations in the given proximity.
   */
  getLocalityNamesWithSorting(lon: number, lat: number) {

    const roughMatches = this.db.queryBuilder("proximityLocalQuerySort", [lat, this.dbSearchRadius, lon, this.dbSearchRadius]);

    const result = roughMatches?.map((location: any) => ({
      ...location, distance: this.#calculateDistance(lat, lon, Number(location.latitude), Number(location.longitude))
    })).filter(location => location.distance <= this.searchRadius)
      .sort((a, b) => a.distance - b.distance);
    return result[0]
  }

  /**
   * Make a query to the db.
   * @param query 
   * @returns Mathing localities from db.
   */
  localityQuery(query: string) {
    const results = this.db.queryBuilder(
      "localityQuery",
      Array(6).fill(`${query}%`)
    );
    return results;
  }
}