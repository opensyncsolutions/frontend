import { useLanguage } from "../contexts/languages";
import { translate } from "../dictionary";

export const useTranslations = () => {
  const { language } = useLanguage();
  return {
    translate: (text: string) => translate(text, language),
  };
};
