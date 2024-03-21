import React from "react";

const Units = ({val, unitType}) => {
  return (
    <div className="countdown-item flex flex-col items-center mx-[5vw] w-[142px]">
      <div className="countdown-value text-[96px] ">{val}</div>
      <div className="countdown-label text-[24px] ">{unitType}</div>
    </div>
  );
};

export default Units;
