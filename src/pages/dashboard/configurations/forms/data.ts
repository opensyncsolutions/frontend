export const formsOptions: {
  code: Form;
  name: FormNames;
  field: Fields;
  translations?: Record<Languages, Record<"name", string>>;
}[] = [
  {
    code: "ENROLLMENT",
    name: "Enrollments",
    field: "enrollments",
    translations: {
      en: { name: "Enrollments" },
      sw: { name: "Uandikishwaji" },
      fr: { name: "Inscriptions" },
    },
  },
  {
    code: "DISBURSEMENT",
    name: "Disbursements",
    field: "disbursements",
    translations: {
      en: { name: "Disbursements" },
      sw: { name: "Malipo" },
      fr: { name: "Décaissements" },
    },
  },
  {
    code: "FOLLOWUP",
    name: "Followups",
    field: "followups",
    translations: {
      en: { name: "Followups" },
      sw: { name: "Ufuatiliaji" },
      fr: { name: "Suivis" },
    },
  },
  {
    code: "BLOODCOLLECTION",
    name: "Blood Collections",
    field: "bloodCollections",
    translations: {
      en: { name: "Blood Collections" },
      sw: { name: "Ukusanyaji wa Damu" },
      fr: { name: "Collecte de Sang" },
    },
  },
  {
    code: "DATACOLLECTION",
    name: "Data Collections",
    field: "dataCollections",
    translations: {
      en: { name: "Data Collections" },
      sw: { name: "Ukusanyaji wa Data" },
      fr: { name: "Collecte de Données" },
    },
  },
  {
    code: "EAC",
    name: "Eacs",
    field: "eacs",
    translations: {
      en: { name: "Eacs" },
      sw: { name: "Eacs" },
      fr: { name: "Eacs" },
    },
  },
];
