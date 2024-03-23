export const translate = (text: string, lang: Languages) => {
  return dictionary.find((words) => words?.default === text)?.[lang] || text;
};

const dictionary = [
  {
    en: "Settings",
    sw: "Tengeneza",
    fr: "jkbdw",
    default: "Settings",
  },
  {
    en: "Path",
    sw: "Njia",
    fr: "jhb",
    default: "Path",
  },
];
