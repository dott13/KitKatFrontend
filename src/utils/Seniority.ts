export const JobTitleRankIdMap = {
  Junior: 1,
  Associate: 2,
  MidLevel: 3,
  Senior: 4,
  Lead: 5,
  Manager: 6,
} as const;

// Reverse map
export const IdJobTitleRankMap: { [key: number]: string } = Object.fromEntries(
  Object.entries(JobTitleRankIdMap).map(([title, id]) => [id, title])
);