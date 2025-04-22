import React from "react";

const ProgressBar = ({
  progress = 0,
  size = 300,
  strokeWidth = 10,
  circleColor = "#e0e0e0",
  progressColor = "#4CAF50",
  textColor = "#333",
  showPercent = true,
  showText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center m-4">
      <div className="relative" style={{ width: size, height: size / 2 }}>
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${size} ${size / 2}`}
          preserveAspectRatio="xMinYMin meet"
        >
          {/* Background circle */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} 
                 a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="none"
            stroke={circleColor}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} 
                 a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="none"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {showText && (
          <div
            className="absolute bottom-0 left-0 right-0 text-center"
            style={{
              color: textColor,
              paddingBottom: size / 8,
            }}
          >
            <span className="text-xl font-bold">
              {progress}
              {showPercent && "%"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
