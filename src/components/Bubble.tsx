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
    <div
      style={{
        display: "flex-container",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderRadius: "50%",
          backgroundColor: getBubbleColor(current, total),
          color: "white",
          fontSize: "32px",
          textAlign: "center",
          minWidth: "30px", // Adjust the width as needed
          minHeight: "30px", // Adjust the height as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {current}/{total}
      </div>
      <div style={{ textAlign: "center" }}>Permissions</div>
    </div>
  );
};

export default StatusBubble;
