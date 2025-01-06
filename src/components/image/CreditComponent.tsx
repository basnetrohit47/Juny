import { Link, Typography } from "@mui/material";
import { useGetImage } from "../../queries/image.query";

export const CreditComponent = () => {
  const { data: photo } = useGetImage();

  return (
    <>
      <div className=" flex flex-col  items-start justify-center ">
        <div>
          <Typography className="text-white/70 " fontSize={"small"}>
            {photo?.title}
          </Typography>
        </div>
        <div className="flex items-center">
          <Link href={photo?.credential_link || ""} className="!no-underline">
            <Typography className="text-white/70  " fontSize={"small"}>
              {photo?.credential}
            </Typography>
          </Link>
          {photo?.credit && <div className="pl-2 pr-2 text-white">|</div>}

          <Link href={photo?.link || ""} className="!no-underline">
            <Typography className="text-white/70 " fontSize={"small"}>
              {photo?.credit}
            </Typography>
          </Link>
        </div>
      </div>
    </>
  );
};
