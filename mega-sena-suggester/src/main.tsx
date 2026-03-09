import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PalpitesProvider } from "./context/PalpitesContext.tsx";

document.documentElement.style.margin = "0";
document.documentElement.style.padding = "0";
document.documentElement.style.backgroundColor = "#050505";
document.documentElement.style.minHeight = "100%";

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.backgroundColor = "#050505";
document.body.style.minHeight = "100vh";

const rootElement = document.getElementById("root");

if (rootElement) {
  rootElement.style.minHeight = "100vh";
  rootElement.style.backgroundColor = "#050505";
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PalpitesProvider>
      <App />
    </PalpitesProvider>
  </BrowserRouter>,
);
