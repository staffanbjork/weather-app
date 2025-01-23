import { CategoryIndex, WeatherCategoryProps } from "../types/types";


// Descriptive string of weather and matching icon from weathersymbol number.
export const WEATHER_CATEGORY: Record<CategoryIndex, WeatherCategoryProps> = {
  1: {
    cat: "Klart",
    icon: { day: "01d", night: "01n", midnightSun: "01m" }
  },
  2: {
    cat: "Lätt molnighet",
    icon: { day: "02d", night: "02n", midnightSun: "02m" },
  },
  3: {
    cat: "Halvklart",
    icon: { day: "02d", night: "02n", midnightSun: "02m" },
  },
  4: {
    cat: "Molnigt",
    icon: { day: "03d", night: "03n", midnightSun: "03m" }
  },
  5: {
    cat: "Mycket moln",
    icon: { day: "04", night: "04", midnightSun: "04" },
  },
  6: {
    cat: "Mulet",
    icon: { day: "04", night: "04", midnightSun: "04" }
  },
  7: {
    cat: "Dimma",
    icon: { day: "15", night: "15", midnightSun: "15" }
  },
  8: {
    cat: "Lätt regnskur",
    icon: { day: "40d", night: "40n", midnightSun: "40m" },
  },
  9: {
    cat: "Regnskur",
    icon: { day: "05d", night: "05n", midnightSun: "05m" },
  },
  10: {
    cat: "Kraftig regnskur",
    icon: { day: "41d", night: "41n", midnightSun: "41m" },
  },
  11: {
    cat: "Åskskur",
    icon: { day: "11", night: "11", midnightSun: "11" }
  },
  12: {
    cat: "Lätt by av regn och snö",
    icon: { day: "42d", night: "42n", midnightSun: "42m" },
  },
  13: {
    cat: "By av regn och snö",
    icon: { day: "07d", night: "07n", midnightSun: "07m" },
  },
  14: {
    cat: "Kraftig by av regn och snö",
    icon: { day: "43d", night: "43n", midnightSun: "43m" },
  },
  15: {
    cat: "Lätt snöby",
    icon: { day: "44d", night: "44n", midnightSun: "44m" },
  },
  16: { cat: "Snöby", icon: { day: "08d", night: "08n", midnightSun: "08m" } },
  17: {
    cat: "Kraftig snöby",
    icon: { day: "45d", night: "45n", midnightSun: "45m" },
  },
  18: {
    cat: "Lätt regn",
    icon: { day: "46", night: "46", midnightSun: "46" }
  },
  19: {
    cat: "Regn",
    icon: { day: "09", night: "09", midnightSun: "09" }
  },
  20: {
    cat: "Kraftigt regn",
    icon: { day: "10", night: "10", midnightSun: "10" },
  },
  21: {
    cat: "Åska",
    icon: { day: "22", night: "22", midnightSun: "22" }
  },
  22: {
    cat: "Lätt snöblandat regn",
    icon: { day: "47", night: "47", midnightSun: "47" },
  },
  23: {
    cat: "Snöblandat regn",
    icon: { day: "12", night: "12", midnightSun: "12" },
  },
  24: {
    cat: "Kraftigt snöblandat regn",
    icon: { day: "48", night: "48", midnightSun: "48" },
  },
  25: {
    cat: "Lätt snöfall",
    icon: { day: "49", night: "49", midnightSun: "49" },
  },
  26: {
    cat: "Snöfall",
    icon: { day: "13", night: "13", midnightSun: "13" }
  },
  27: {
    cat: "Ymnigt snöfall",
    icon: { day: "50", night: "50", midnightSun: "50" },
  },
};