import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const SearchComponent = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      chrome.search.query({ text: query.trim(), disposition: "CURRENT_TAB" });
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div
        className="m-4 w-[80%] rounded-[12px] backdrop-blur-[20px] "
        style={{
          background: "rgb(0 0 0 / 47%)",
        }}
      >
        <TextField
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          fullWidth
          id="input-with-icon-textfield"
          placeholder="Search the web"
          className="ml-0 mr-0 flex-1 rounded-[12px] text-white bg-[rgba(255,255,255,0.1)]"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.8)",
                borderRadius: "12px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.8)",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "white",
                fontWeight: "500",
                opacity: 0.6,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};
