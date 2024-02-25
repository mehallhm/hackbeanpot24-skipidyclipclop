import React, { useState, useEffect } from "react";

interface BubbleProps {
  current: number;
  total: number;
}

const StatusBubble: React.FC<BubbleProps> = ({ current, total }) => {
  // Function to determine the color of the bubble based on the ratio of current to total
  const getBubbleColor = (current: number, total: number) => {
    // Calculate the ratio of current to total
    const ratio = current / total;

    // Determine the color based on the ratio
    if (ratio < 0.25) {
      return "darkred";
    } else if (ratio < 1) {
      return "#ff9900";
    } else {
      return "#006600";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-20 w-14">
      <div
        style={{
          padding: "10px",
          borderRadius: "50%",
          backgroundColor: getBubbleColor(current, total),
          color: "white",
          fontSize: "25px",
          textAlign: "center",
          minWidth: "30px",
          minHeight: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current}/{total}
      </div>
      <div className="font-xs truncate" style={{ textAlign: "center" }}>
        Perms
      </div>
    </div>
  );
};

export default StatusBubble;
