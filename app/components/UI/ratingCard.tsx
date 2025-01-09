import { useEffect } from "react";

const UzTopRating = () => {
  useEffect(() => {
    let topJs = "1.0";
    let topR = `id=47752&r=${escape(document.referrer)}&pg=${escape(window.location.href)}`;
    document.cookie = "smart_top=1; path=/";
    topR += `&c=${document.cookie ? "Y" : "N"}`;

    // JavaScript 1.1 features
    topJs = "1.1";
    topR += `&j=${navigator.javaEnabled() ? "Y" : "N"}`;

    // JavaScript 1.2 features
    topJs = "1.2";
    topR += `&wh=${screen.width}x${screen.height}&px=${navigator.appName.substring(0, 3) === "Mic" ? screen.colorDepth : screen.pixelDepth}`;

    // JavaScript 1.3 features
    topJs = "1.3";

    // Finalize request
    const topRat = "&col=133E43&t=ffffff&p=E6850F";
    topR += `&js=${topJs}`;

    const linkElement = document.createElement("a");
    linkElement.href = "http://www.uz/ru/res/visitor/index?id=47752";
    linkElement.target = "_top";

    const imgElement = document.createElement("img");
    imgElement.src = `https://cnt0.www.uz/counter/collect?${topR}${topRat}`;
    imgElement.width = 88;
    imgElement.height = 31;
    imgElement.alt = "Топ рейтинг www.uz";
    imgElement.border = "0";

    linkElement.appendChild(imgElement);
    (document as any).getElementById("uz-top-rating").appendChild(linkElement);
  }, []);

  return (
    <div className="overflow-hidden float-end">
      <div id="uz-top-rating"></div>

      <noscript>
        <div className="w-10 h-10 overflow-hidden">
          <a
            href="http://www.uz/ru/res/visitor/index?id=47752"
            target="_top"
            rel="noopener noreferrer"
          >
            <img
              src="https://cnt0.www.uz/counter/collect?id=47752&pg=http%3A//uzinfocom.uz&&col=133E43&t=ffffff&p=E6850F"
              width="88"
              height="31"
              alt="Топ рейтинг www.uz"
            />
          </a>
        </div>
      </noscript>
    </div>
  );
};

export default UzTopRating;
