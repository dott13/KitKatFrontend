// languages.ts
export enum LanguageAbbreviations {
  EN = "English",
  FR = "French",
  DE = "German",
  ES = "Spanish",
  IT = "Italian",
  PT = "Portuguese",
  RU = "Russian",
  ZH = "Chinese",
  JA = "Japanese",
}

// Create a reverse mapping to get abbreviations from full names
export const languageMap: { [key: string]: string } = {
  English: "EN",
  French: "FR",
  German: "DE",
  Spanish: "ES",
  Italian: "IT",
  Portuguese: "PT",
  Russian: "RU",
  Chinese: "ZH",
  Japanese: "JA",
};


export const languageAbbreviationsIdMap: { [key: string]: number } = {
  EN: 1,
  FR: 3,
  DE: 4,
  ES: 2,
  IT: 5,
  PT: 6,
  RU: 9,
  ZH: 7,
  JA: 8,
};