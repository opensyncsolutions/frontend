import React from "react";
import ReactDOM from "react-dom/client";
import ApolloProvider from "./ApolloProvider";
import App from "./appa";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
