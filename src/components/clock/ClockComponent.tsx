import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const ClockComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="text-left p-6 pb-0">
      <Typography variant="h2" className="text-white font-light">
        {currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
      <Typography variant="h6" className="text-white font-light">
        {formatDate(currentTime)}
      </Typography>
    </div>
  );
};
