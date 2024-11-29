export const JobTitleIdMap: { [key: string]: number } = {
  "ITTechnician": 1,
  "Support Specialist": 2,
  "Quality Assurance Tester": 3,
  "Web Developer": 4,
  "IT Security Specialist": 5,
  "Computer Programmer": 6,
  "System Analyst": 7,
  "Network Engineer": 8,
  "Software Engineer": 9,
  "User Experience Designer": 10,
  "Database Administrator": 11,
  "Data Scientist": 12,
  "Computer Scientist": 13,
  "IT Director": 14,
};

export const ReversedJobTitleIdMap: { [key: number]: string } = Object.entries(JobTitleIdMap).reduce((acc, [title, id]) => {
  acc[id] = title;
  return acc;
}, {} as { [key: number]: string });