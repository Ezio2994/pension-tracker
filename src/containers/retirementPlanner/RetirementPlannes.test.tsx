/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { RetirementPlanner } from "./index";

jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="mocked-line-chart"></div>,
  Doughnut: () => <div data-testid="mocked-doughnut-chart"></div>,
}));

describe("RetirementPlanner", () => {
  test("submitting form with data and checking calculated values", async () => {
    render(<RetirementPlanner />);

    fireEvent.change(screen.getByLabelText(/Retirement Income/i), { target: { value: "16000" } });
    fireEvent.change(screen.getByLabelText(/Employer Contributions/i), { target: { value: "200" } });
    fireEvent.change(screen.getByLabelText(/Personal Contributions/i), { target: { value: "300" } });
    fireEvent.change(screen.getByLabelText(/Retirement Age/i), { target: { value: "65" } });
    fireEvent.change(screen.getByLabelText(/Annual Interest Rate/i), { target: { value: "4.9" } });
    fireEvent.change(screen.getByLabelText(/Add Pension Pots/i), { target: { value: "55000" } });

    fireEvent.click(screen.getByText(/Add Pot/i));
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Desired pot/i)).toBeInTheDocument();
      expect(screen.getByText(/Projected pot/i)).toBeInTheDocument();

      expect(screen.getAllByTestId("mocked-line-chart")[0]).toBeInTheDocument();
      expect(screen.getAllByTestId("mocked-line-chart")[1]).toBeInTheDocument();
      expect(screen.getByTestId("mocked-doughnut-chart")).toBeInTheDocument();
    });

    expect(screen.getByTestId("desiredPot")).toHaveTextContent("256000");
    expect(screen.getByTestId("projectedPot")).toHaveTextContent("1175649");
  });
});
