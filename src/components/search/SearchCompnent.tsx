import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
export const SearchComponent = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (query) {
        // Redirect to Google search results
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`;
      }
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
                borderColor: "rgba(255,255,255,0.8)", // this is the original border color
                borderRadius: "12px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.8)", // use the original border color on hover
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
                  <img
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                    alt=""
                    className="w-5 h-5"
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{ fontSize: 34, paddingBottom: "5px", color: "white" }}
                  />
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
