import { useEffect } from "react";

const UzTopRating = () => {
  useEffect(() => {
    const topJs = "1.3";
    let topR = `id=47752&r=${escape(document.referrer)}&pg=${escape(window.location.href)}`;
    document.cookie = "smart_top=1; path=/";
    topR += `&c=${document.cookie ? "Y" : "N"}`;
    topR += `&j=${navigator.javaEnabled() ? "Y" : "N"}`;
    topR += `&wh=${screen.width}x${screen.height}&px=${navigator.appName.substring(0, 3) === "Mic" ? screen.colorDepth : screen.pixelDepth}`;
    topR += "&col=D0D0CF&t=ffffff&p=24211D&js=" + topJs;

    const imgElement = document.createElement("img");
    imgElement.src = `https://cnt0.www.uz/counter/collect?${topR}`;
    imgElement.width = 88;
    imgElement.height = 31;
    (imgElement as any).border = 0;
    imgElement.alt = "Топ рейтинг www.uz";

    const linkElement = document.createElement("a");
    linkElement.href = "http://www.uz/ru/res/visitor/index?id=47752";
    linkElement.target = "_top";
    linkElement.appendChild(imgElement);

    (document as any).getElementById("uz-top-rating").appendChild(linkElement);
  }, []);

  return (
    <div className="overflow-hidden mt-7 float-end">
      <div id="uz-top-rating"></div>

      {/* Fallback for non-JavaScript users */}
      <noscript>
        <div className="w-10 h-10 overflow-hidden">
          <a
            href="http://www.uz/ru/res/visitor/index?id=47752"
            target="_top"
            rel="noopener noreferrer"
          >
            <img
              src="https://cnt0.www.uz/counter/collect?id=47752&pg=http%3A//uzinfocom.uz&&col=D0D0CF&t=ffffff&p=24211D"
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
