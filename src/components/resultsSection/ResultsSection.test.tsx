import React from "react";
import { render, screen } from "@testing-library/react";
import { ResultSection } from "./index";
import { ChartData } from "chart.js";

jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="mocked-line-chart"></div>,
  Doughnut: () => <div data-testid="mocked-doughnut-chart"></div>,
}));

describe("ResultSection", () => {
  const mockPensionStats = {
    desiredPot: 100000,
    projectedPot: 80000,
  };

  const mockLineChartData: ChartData<"line"> = {
    labels: ["Year 1", "Year 2"],
    datasets: [
      {
        label: "Projected Pension Pot",
        data: [50000, 80000],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const mockDoughnutChartData: ChartData<"doughnut"> = {
    labels: ["Current Pots", "Remaining"],
    datasets: [
      {
        data: [30000, 70000],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  test("renders pension stats correctly", () => {
    render(
      <ResultSection
        pensionStats={mockPensionStats}
        projectPensionChartData={mockLineChartData}
        postRetirementChartData={mockLineChartData}
        currentPensionChartData={mockDoughnutChartData}
      />
    );

    expect(screen.getByTestId("desiredPot")).toHaveTextContent("100000");
    expect(screen.getByTestId("projectedPot")).toHaveTextContent("80000");
  });
});
