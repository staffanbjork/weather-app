import betterSqlite3 from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LocalityResults} from "../types/types.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dbFilename = process.env.DB_FILENAME || "geoDb.sqlite3";

// Database template
const dbTemplatePath = path.join(__dirname, "..", "..", "..", "db", "template", __dbFilename);

// Live database created by copying the template db
const dbLivePath = path.join(__dirname, "..", "..", "..", "db", "live", __dbFilename)

// If live version doesnt exist, create a copy
!fs.existsSync(dbLivePath) && fs.copyFileSync(dbTemplatePath, dbLivePath);



export default class DB {
  db: betterSqlite3.Database;

  constructor() {
    this.db = new betterSqlite3(dbLivePath);
    this.db.pragma("journal_mode = WAL");
  }

  static QUERIES: {[key: string] : string} = {
    localityQuery: `
      SELECT * 
      FROM locations
      WHERE locality LIKE ? OR municipality LIKE ? OR county LIKE ?
      ORDER BY
        CASE
          WHEN Locality LIKE ? THEN 1
          WHEN Municipality LIKE ? THEN 2
          WHEN County LIKE ? THEN 3
        END
        LIMIT 5`,
    getLocalityName: `
      SELECT locality, municipality, county
      FROM locations
      WHERE longitude LIKE ? AND latitude LIKE ?
      LIMIT 1`,
    haversineQuery: `
      SELECT locality, municipality, county, latitude, longitude,
        (6371 * acos(
          cos(? * PI() / 180) * cos(latitude * PI() / 180) *
          cos(longitude * PI() / 180 - ? * PI() / 180) +
          sin(? * PI() / 180) * sin(latitude * PI() / 180)
          )) AS distance
      FROM locations
      WHERE distance <= ?
      ORDER BY distance ASC`,
    proximityLocalQuery: `SELECT *
      FROM locations
      WHERE latitude BETWEEN ? AND ?
      AND longitude BETWEEN ? AND ?`,
    proximityLocalQuerySort: `
      SELECT *
      FROM locations
      WHERE ABS(latitude - ?) < ? AND ABS(longitude - ?) < ?`,
  } ;

  queryBuilder(queryType: string, params: (string | number)[]) {
    try {
      const prepState = this.db.prepare(DB.QUERIES[`${queryType}`]);
      const result = prepState.all([...params]);
      return result as LocalityResults;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}