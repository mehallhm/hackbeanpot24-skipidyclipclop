import React, { useState, useEffect } from "react";

interface BubbleProps {
  current: number;
  total: number;
}

const StatusBubble: React.FC<BubbleProps> = ({ current, total }) => {
  // Function to determine the color of the bubble based on the ratio of current to total
  // const getBubbleColor = (current: number, total: number) => {
  // Calculate the ratio of current to total
  const ratio = current / total;
  const writtenRatio = "        " + current.toString() + "/" + total.toString();
  let color = "#006600";
  // Determine the color based on the ratio
  if (ratio < 0.25) {
    color = "darkred";
  } else if (ratio < 1) {
    color = "#ff9900";
  }

  return (
    <h1
      style={{
        color: color,
        fontSize: "24px",
      }}
    >
      {writtenRatio}
    </h1>
  );
};

export default StatusBubble;
