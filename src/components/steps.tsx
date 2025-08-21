import React from "react";

const Step = ({ steps = 5000, goal = 10000 }) => {
  const progress = Math.min(steps / goal, 1) * 100;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-80">
      <h2 className="text-xl font-bold mb-2">Steps</h2>
      <p className="text-gray-500 mb-4">
        {steps.toLocaleString()} / {goal.toLocaleString()} steps
      </p>
      
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-400 mt-2">
        {Math.round(progress)}% of your goal
      </p>
    </div>
  );
};

export default Step;
