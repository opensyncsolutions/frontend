import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { languages } from "../constants/constants";

// Define the types
type Action = { type: "SET_LANGUAGE"; payload: Languages };

// Define the initial state
let initialState: Languages = localStorage.getItem("language") || ("en" as any);

if (!languages.find((lang) => lang?.lang === initialState)) {
  initialState = "en";
}

// Create the context
const LanguageContext = createContext<{
  language: Languages;
  updateLanguage: Dispatch<Action>;
}>({
  language: initialState,
  updateLanguage: () => null,
});

// Define the reducer function
const languageReducer = (state: Languages, action: Action): Languages => {
  switch (action.type) {
    case "SET_LANGUAGE":
      localStorage.setItem("language", action.payload);
      return action.payload;
    default:
      return state;
  }
};

// Define a custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Define the provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, updateLanguage] = useReducer(languageReducer, initialState);
  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
