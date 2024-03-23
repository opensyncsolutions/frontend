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
  {
    en: "More",
    sw: "Zaidi",
    fr: "jhb",
    default: "More",
  },
  {
    en: "Less",
    sw: "Pungufu",
    fr: "jhb",
    default: "Less",
  },
  {
    en: "Translations",
    sw: "Tafsiri",
    fr: "jhb",
    default: "Translations",
  },
];
