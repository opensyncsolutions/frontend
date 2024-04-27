export const translate = (text: string, lang: Languages) => {
  return dictionary.find((words) => words?.default === text)?.[lang] || text;
};

const dictionary = [
  {
    en: "Settings",
    sw: "Mipangilo",
    default: "Settings",
  },
  {
    en: "Path",
    sw: "Njia",
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
  {
    en: "Form",
    sw: "Fomu",
    fr: "jhb",
    default: "Form",
  },
  {
    en: "Code",
    sw: "Msimbo",
    fr: "jhb",
    default: "Code",
  },
];
