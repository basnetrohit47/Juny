import AppsIcon from "@mui/icons-material/Apps";
import { IconButton, Link, Popover, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";
import { AppItems } from "./AppList";
export const GoogleAppComponent = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleRedirection = (url: string) => {
    chrome.tabs.create({ url });
  };
  return (
    <>
      <div className="p-6 ml-2">
        <Tooltip title="Google Apps">
          <IconButton aria-describedby={id} onClick={handleClick}>
            <AppsIcon />
          </IconButton>
        </Tooltip>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-6 p-4 ">
            {AppItems.map((app) => (
              <div key={app.label}>
                <Link href={app.link} target="_blank" rel="noopener">
                  <img
                    src={app.icon}
                    alt={app.label}
                    width="50px"
                    height="50px"
                  />
                </Link>
              </div>
            ))}
          </div>
        </Popover>
        <Tooltip title="Go to download">
          <IconButton onClick={() => handleRedirection("chrome://downloads/")}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Go to History">
          <IconButton onClick={() => handleRedirection("chrome://history/")}>
            <HistoryIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};
