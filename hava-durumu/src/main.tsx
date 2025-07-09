import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { TourProvider, useTour } from "@reactour/tour";
import "./index.css";
import App from "./App.tsx";

const steps = [
  {
    selector: "body",
    content:
      "Hava Durumu uygulamamıza hoşgeldiniz!🌸🍀 Bu uygulama ile istediğiniz şehirlerin verilerini kolaylıkla takip edebilirsiniz.",
  },
  {
    selector: ".second-step",
    content:
      "Burada en başta gördüğünüz şehir ana şehriniz. Hangi şehir hakkında daha çok veriye ulaşmak isterseniz onun üstüne tıklayarak ana şehir olarak seçebilirsiniz.",
  },
  {
    selector: ".sub-second-step",
    content:
      "Ana şehrinizin haftalık hava durumu tahmini ve günlük sıcaklık değerlerini tablodan rahatça okuyabilirsiniz.",
  },
  {
    selector: ".subsub-second-step",
    content:
      "Bu grafikten ise tablodan üstüne bastığınız herhangi bir günün saatlik sıcaklık verilerini görebilisiniz. Tablodaki günlere basmayı ve grafik üzerinde farenizi gezdirmeyi deneyin 🧚🏻‍♀️",
  },
  {
    selector: ".third-step",
    content: "Başka bir şehir eklemek için buradan arayın.",
  },
  {
    selector: ".fourth-step",
    content:
      "Eklediğiniz şehrin üzerine tıklayarak ana şehriniz olarak seçebilirsiniz. Böylece istediğiniz zaman, istediğiniz şehir hakkında daha ayrıntılı bilgiye ulaşabilirsiniz!",
  },
  {
    selector: ".sub-fourth-step",
    content: "Ayrıca bu butona basarak eklediğiniz şehirleri silebilirsiniz. ",
  },

  {
    selector: ".fifth-step",
    content:
      "Her şehir için ekranda gördüğünüz kartlar ile daha ayrıntılı bilgi edinebilirsiniz 🌝 Güneşli günler dileriz! ",
  },
];

function ScrollHandler() {
  const { currentStep } = useTour();

  useEffect(() => {
    if (currentStep === 4) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  return null; // This component just does the side effect
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TourProvider steps={steps}>
      <ScrollHandler />
      <App />
    </TourProvider>
  </StrictMode>
);
