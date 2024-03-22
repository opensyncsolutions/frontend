export const translate = (text: string, lang: "en" | "sw") => {
  return dictionary.find((words) => words?.default === text)?.[lang] || text;
};

const dictionary = [
  {
    en: "Settings",
    sw: "Tengeneza",
    default: "Settings",
  },
  {
    en: "Path",
    sw: "Njia",
    default: "Path",
  },
];
