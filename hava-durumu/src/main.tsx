import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import JoyrideTour from "../components/JoyrideTour.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JoyrideTour />
    <App />
  </StrictMode>
);
