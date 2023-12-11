import React from "react";
import { LineChart, DoughnutChart } from "../charts";
import { PensionStats } from "../../containers/retirementPlanner";
import { ChartData } from "chart.js";

interface ResultSectionProps {
  pensionStats: PensionStats;
  projectPensionChartData: ChartData<"line"> | undefined;
  postRetirementChartData: ChartData<"line"> | undefined;
  currentPensionChartData: ChartData<"doughnut"> | undefined;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  currentPensionChartData,
  pensionStats,
  postRetirementChartData,
  projectPensionChartData,
}) => {
  return (
    <div className="pensionContainer">
      <div className="pensionStats">
        <div>
          <p className="statLabel">Desired pot:</p>
          <p data-testid="desiredPot" className="statValue">
            £{pensionStats.desiredPot}
          </p>
        </div>
        <div>
          <p className="statLabel">Projected pot:</p>
          <p data-testid="projectedPot" className="statValue">
            £{pensionStats.projectedPot}
          </p>
        </div>
      </div>
      <div className="chartContainer">
        {projectPensionChartData ? <LineChart data={projectPensionChartData} /> : <></>}
      </div>
      <div className="chartContainer">
        {postRetirementChartData ? <LineChart data={postRetirementChartData} /> : <></>}
      </div>
      {currentPensionChartData ? (
        <div>
          <p>how your current pension pots contribute to your desired pension total:</p>
          <div className="doughnutChartContainer">
            <DoughnutChart data={currentPensionChartData} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
