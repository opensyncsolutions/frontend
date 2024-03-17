import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/index.sass";
import { LanguageProvider } from "@/shared/contexts/languages";

const queryClient = new QueryClient();

if (process.env.NODE_ENV !== "development") {
  console.log = console.warn = console.error = () => {};
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </LanguageProvider>
  </React.StrictMode>
);
