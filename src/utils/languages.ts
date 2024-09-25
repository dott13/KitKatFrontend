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
