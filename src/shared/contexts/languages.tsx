import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";

// Define the types
type Action = { type: "SET_LANGUAGE"; payload: "en" | "sw" };

type State = "en" | "sw";

// Define the initial state
const initialState: State = localStorage.getItem("language") || ("en" as any);

// Create the context
const LanguageContext = createContext<{
  language: State;
  updateLanguage: Dispatch<Action>;
}>({
  language: initialState,
  updateLanguage: () => null,
});

// Define the reducer function
const languageReducer = (state: State, action: Action): State => {
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
