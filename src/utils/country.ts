export const CountryIdMap = {
  1: "United States",
  2: "Canada",
  3: "Mexico",
  4: "Germany",
  5: "France",
  6: "Italy",
  7: "Japan",
  8: "Australia",
  9: "Brazil",
  10: "India"
} as const;


export const ReversedCountryIdMap = Object.entries(CountryIdMap).reduce((acc, [id, name]) => {
  acc[name] = Number(id); // Store the ID as a number
  return acc;
}, {} as { [key: string]: number });

export const CityIdMap = {
  "New York": 1,
  "Los Angeles": 2,
  "Chicago": 3,
  "Toronto": 4,
  "Vancouver": 5,
  "Montreal": 6,
  "Mexico City": 7,
  "Berlin": 8,
  "Munich": 9,
  "Frankfurt": 10,
  "Paris": 11,
  "Lyon": 12,
  "Marseille": 13,
  "Rome": 14,
  "Milan": 15,
  "Florence": 16,
  "Tokyo": 17,
  "Sydney": 18,
  "São Paulo": 19,
  "Mumbai": 20,
} as const;

// Optional: For easy access, you can also create a reverse map to get city names from IDs
export const CityNameMap = Object.fromEntries(
  Object.entries(CityIdMap).map(([cityName, id]) => [id, cityName])
);
