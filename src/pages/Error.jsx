import React, { useState, useEffect } from "react";

const Error = ({ err, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideError = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(hideError, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [err]);

  return (
    <>
      {isVisible && (
        <div
          className={`text-xl p-2 rounded-sm ${color === "red" ? "bg-red-500" : "bg-green-500"} text-white`}
        >
          {err}
        </div>
      )}
    </>
  );
};

export default Error;
