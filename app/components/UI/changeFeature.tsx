import React from "react";
import { Button } from "antd";

interface TimeFilterButtonsProps {
  time: string;
  timeFilter: { future: string; past: string };
  t: (key: string) => string;
  setTime: any;
  setCurrentPage: (page: number) => void;
}

const TimeFilterButtons: React.FC<TimeFilterButtonsProps> = ({
  time,
  timeFilter,
  t,
  setTime,
  setCurrentPage,
}) => {
  return (
    <div className="flex items-center max-md:gap-2 gap-4 justify-center mt-10">
      <Button
        className={`${
          time === timeFilter.future
            ? "bg-text_secondary text-white"
            : "bg-text_tertiary text-text_secondary"
        } max-md:px-7 max-sm:text-sm max-md:py-5 font-semibold py-5 px-12 rounded text-md`}
        onClick={() => {
          setTime(timeFilter.future);
          setCurrentPage(1);
        }}
      >
        {t("future")}
      </Button>
      <Button
        className={`${
          time === timeFilter.past
            ? "bg-text_secondary text-white"
            : "bg-text_tertiary text-text_secondary"
        } max-sm:px-7 max-sm:py-5 max-sm:text-sm font-semibold rounded py-5 px-12 text-md`}
        onClick={() => {
          setTime(timeFilter.past);
          setCurrentPage(1);
        }}
      >
        {t("past")}
      </Button>
    </div>
  );
};

export default TimeFilterButtons;
