import React from "react";

const PreLoader = (props) => {
  const { size, color } = props;
  return (
    <div
      className={`h-${size ?? "5"} w-${
        size ?? "5"
      } animate-spin rounded-full border-4 border-solid border-${
        color ?? "white"
      } border-t-transparent`}
    ></div>
  );
};

export default PreLoader;
