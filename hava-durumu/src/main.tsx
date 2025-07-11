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
    content: "Silme menüsünü açmak için bu butona tıklayın. ",
  },
  {
    selector: ".subsub-fourth-step",
    content: "Şehri silmek için buraya tıklayın.",
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

function ClickHandler() {
  const { currentStep, setCurrentStep } = useTour();

  useEffect(() => {
    if (currentStep === 6) {
      const button = document.querySelector(".sub-fourth-step");

      if (!button) return;

      const onClick = () => {
        const checkMenu = setInterval(() => {
          const menuItem = document.querySelector(".subsub-fourth-step");
          if (menuItem) {
            clearInterval(checkMenu);
            setTimeout(() => setCurrentStep(7), 150);
          }
        }, 100);
      };

      button.addEventListener("click", onClick, { once: true });

      return () => {
        button.removeEventListener("click", onClick);
      };
    }
    if (currentStep === 7) {
      const dropdown = document.querySelector(".subsub-fourth-step");

      if (!dropdown) return;

      const onClick = () => {
        const checkMenuClose = setInterval(() => {
          const menuItem = document.querySelector(".subsub-fourth-step");
          if (!menuItem) {
            clearInterval(checkMenuClose);
            setTimeout(() => setCurrentStep(8), 0);
          }
        }, 100);
      };

      dropdown.addEventListener("click", onClick, { once: true });

      return () => {
        dropdown.removeEventListener("click", onClick);
      };
    }
  }, [currentStep, setCurrentStep]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TourProvider steps={steps}>
      <ScrollHandler />
      <ClickHandler />
      <App />
    </TourProvider>
  </StrictMode>
);
