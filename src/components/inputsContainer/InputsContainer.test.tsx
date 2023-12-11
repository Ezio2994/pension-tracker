import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { InputsContainer, RetirementData } from "./index";

describe("InputsContainer", () => {
  test("submitting form with data", () => {
    const mockOnSubmit = jest.fn();

    render(<InputsContainer onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Retirement Income/i), { target: { value: "50000" } });
    fireEvent.change(screen.getByLabelText(/Employer Contributions/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/Personal Contributions/i), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText(/Retirement Age/i), { target: { value: "65" } });
    fireEvent.change(screen.getByLabelText(/Annual Interest Rate/i), { target: { value: "4.9" } });
    fireEvent.change(screen.getByLabelText(/Add Pension Pots/i), { target: { value: "1000" } });

    fireEvent.click(screen.getByText(/Add Pot/i));

    fireEvent.click(screen.getByText(/Submit/i));

    const expectedData: RetirementData = {
      retirementIncome: 50000,
      employerContributions: 100,
      personalContributions: 50,
      retirementAge: 65,
      currentPots: [1000],
      annualInterestRate: 4.9,
    };
    expect(mockOnSubmit).toHaveBeenCalledWith(expectedData);
  });
});
