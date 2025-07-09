import React from "react";
import Joyride, { type Step } from "react-joyride";

const steps: Step[] = [
  {
    target: "body",
    content:
      "Hava Durumu uygulamamıza hoşgeldiniz!🌸🍀 Bu uygulama ile istediğiniz şehirlerin verilerini kolaylıkla takip edebilirsiniz.",
    placement: "center",
  },
  {
    target: ".second-step",
    content:
      "Burada en başta gördüğünüz şehir ana şehriniz. Hangi şehir hakkında daha çok veriye ulaşmak isterseniz onun üstüne tıklayarak ana şehir olarak seçebilirsiniz.",
    placement: "right",
    disableScrolling: true,
  },
  {
    target: ".sub-second-step",
    content:
      "Ana şehrinizin haftalık hava durumu tahmini ve günlük sıcaklık değerlerini tablodan rahatça okuyabilirsiniz.",
    placement: "right",
  },
  {
    target: ".subsub-second-step",
    content:
      "Bu grafikten ise tablodan üstüne bastığınız herhangi bir günün saatlik sıcaklık verilerini görebilisiniz. Tablodaki günlere basmayı ve grafik üzerinde farenizi gezdirmeyi deneyin 🧚🏻‍♀️",
    placement: "left",
    spotlightClicks: true,
    disableOverlay: true,
  },
  {
    target: ".third-step",
    content: "Başka bir şehir eklemek için buradan arayın.",
    placement: "left",
    spotlightClicks: true,
  },
  {
    target: ".fourth-step",
    content:
      "Eklediğiniz şehrin üzerine tıklayarak ana şehriniz olarak seçebilirsiniz. Böylece istediğiniz zaman, istediğiniz şehir hakkında daha ayrıntılı bilgiye ulaşabilirsiniz!",
    placement: "left",
    disableScrolling: true,
    spotlightClicks: true,
  },
  {
    target: ".sub-fourth-step",
    content: "Ayrıca bu butona basarak eklediğiniz şehirleri silebilirsiniz. ",
    placement: "left",
  },

  {
    target: ".fifth-step",
    content:
      "Her şehir için ekranda gördüğünüz kartlar ile daha ayrıntılı bilgi edinebilirsiniz 🌝 Güneşli günler dileriz! ",
    placement: "right",
  },
];

function scrollToWithOffset(selector: string, offset: number) {
  const el = document.querySelector(selector);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const top = window.scrollY + rect.top - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

const JoyrideTour: React.FC = () => {
  return (
    <Joyride
      steps={steps}
      continuous
      showSkipButton
      locale={{
        back: "Geri",
        close: "Kapat",
        last: "Son",
        next: "İleri",
        skip: "Atla",
      }}
      callback={(data) => {
        if (data.type === "step:before" && data.index === 5) {
          scrollToWithOffset(".fourth-step", 80);
        }
        if (data.type === "step:before" && data.index === 1) {
          scrollToWithOffset(".second-step", 80);
        }
      }}
      styles={{
        options: {
          zIndex: 999999,
        },
      }}
    />
  );
};

export default JoyrideTour;
