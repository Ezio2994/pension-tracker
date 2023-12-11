import React, { useState } from "react";
import "../../App.css";

import { ChartData } from "chart.js";
import { InputsContainer, RetirementData } from "../../components/inputsContainer";
import { ResultSection } from "../../components/resultsSection";

const START_USER_AGE = 25;
const END_USER_AGE = 81;

const calculateProjectedPot = (retirementData: RetirementData) => {
  const projectedPot = [];
  const annualInterestRate = 1 + retirementData.annualInterestRate / 100;
  const monthsInYear = 12;

  let currentPot = retirementData.currentPots.reduce((a, b) => a + b, 0);

  for (let age = START_USER_AGE; age <= retirementData.retirementAge; age++) {
    currentPot =
      (currentPot +
        retirementData.employerContributions * monthsInYear +
        retirementData.personalContributions * monthsInYear) *
      annualInterestRate;

    projectedPot.push(Math.round(currentPot));
  }

  return projectedPot;
};

const calculatePostRetirementData = (retirementData: RetirementData) => {
  const postRetirementData = [];
  let currentPot = calculateProjectedPot(retirementData).slice(-1)[0];

  for (let age = retirementData.retirementAge; age !== END_USER_AGE; age++) {
    currentPot -= retirementData.retirementIncome;

    postRetirementData.push(Math.max(currentPot, 0));
  }

  return postRetirementData;
};

const calculateDesiredPot = (retirementData: RetirementData) => {
  const desiredIncomeYears = END_USER_AGE - retirementData.retirementAge;

  return retirementData.retirementIncome * desiredIncomeYears;
};

export interface PensionStats {
  desiredPot: number;
  projectedPot: number;
}

export const RetirementPlanner: React.FC = () => {
  const [pensionStats, setPensionStats] = useState<PensionStats>();
  const [projectPensionChartData, setProjectPensionChartData] = useState<ChartData<"line">>();
  const [postRetirementChartData, setPostRetirementChartData] = useState<ChartData<"line">>();
  const [currentPensionChartData, setCurrentPensionChartData] = useState<ChartData<"doughnut">>();

  const handleSubmit = (retirementData: RetirementData) => {
    const desiredIncomeYears = END_USER_AGE - retirementData.retirementAge;

    const projectedPot = calculateProjectedPot(retirementData);
    const postRetirementData = calculatePostRetirementData(retirementData);
    const desiredPot = calculateDesiredPot(retirementData);

    const currentPotsSum = retirementData.currentPots.reduce((a, b) => a + b, 0);

    setPensionStats({ desiredPot, projectedPot: projectedPot.slice(-1)[0] });

    setProjectPensionChartData({
      labels: Array.from({ length: retirementData.retirementAge - START_USER_AGE }, (_, i) =>
        (i + START_USER_AGE).toString()
      ),
      datasets: [
        {
          label: "Projected Pension Pot Over Time",
          data: projectedPot,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    });

    setPostRetirementChartData({
      labels: Array.from({ length: desiredIncomeYears }, (_, i) => (i + retirementData.retirementAge + 1).toString()),
      datasets: [
        {
          label: "Money Decreasing After Retirement",
          data: postRetirementData,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    });

    setCurrentPensionChartData({
      labels: ["Current Pots", "Desired Pot"],
      datasets: [
        {
          data: [currentPotsSum, desiredPot - currentPotsSum],
          backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <section className="container">
      <InputsContainer onSubmit={handleSubmit} />
      {pensionStats ? (
        <ResultSection
          currentPensionChartData={currentPensionChartData}
          pensionStats={pensionStats}
          postRetirementChartData={postRetirementChartData}
          projectPensionChartData={projectPensionChartData}
        />
      ) : (
        <></>
      )}
    </section>
  );
};
