import React, { useState } from "react";

interface InputsContainerProps {
  onSubmit: (retirementData: RetirementData) => void;
}

export interface RetirementData {
  retirementIncome: number;
  employerContributions: number;
  personalContributions: number;
  retirementAge: number;
  currentPots: number[];
  annualInterestRate: number;
}

export const InputsContainer: React.FC<InputsContainerProps> = ({ onSubmit }) => {
  const [retirementData, setRetirementData] = useState<RetirementData>({
    retirementIncome: 0,
    employerContributions: 0,
    personalContributions: 0,
    retirementAge: 0,
    currentPots: [],
    annualInterestRate: 4.9,
  });
  const [addedPot, setAddedPot] = useState<string>("0");

  const handleInputChange = (key: keyof RetirementData, value: string) => {
    const numericValue = value === "" ? 0 : +value;
    setRetirementData((prevData) => ({ ...prevData, [key]: numericValue }));
  };

  const addPot = () => {
    if (+addedPot !== 0) {
      const newCurrentPots = [...retirementData.currentPots, +addedPot];
      setRetirementData((prevData) => ({ ...prevData, currentPots: newCurrentPots }));
      setAddedPot("0");
    }
  };

  const areRequiredFilled = retirementData.annualInterestRate && retirementData.retirementAge;

  return (
    <div className="inputContainer">
      <label>
        Retirement Income (£/year): *
        <input
          type="number"
          value={retirementData.retirementIncome === 0 ? "" : retirementData.retirementIncome}
          onChange={(e) => handleInputChange("retirementIncome", e.target.value)}
        />
      </label>
      <label>
        Employer Contributions (£/month):
        <input
          type="number"
          value={retirementData.employerContributions === 0 ? "" : retirementData.employerContributions}
          onChange={(e) => handleInputChange("employerContributions", e.target.value)}
        />
      </label>
      <label>
        Personal Contributions (£/month):
        <input
          type="number"
          value={retirementData.personalContributions === 0 ? "" : retirementData.personalContributions}
          onChange={(e) => handleInputChange("personalContributions", e.target.value)}
        />
      </label>
      <label>
        Retirement Age: *
        <input
          type="number"
          value={retirementData.retirementAge === 0 ? "" : retirementData.retirementAge}
          onChange={(e) => handleInputChange("retirementAge", e.target.value)}
        />
      </label>
      <label>
        Annual Interest Rate (%):
        <input
          type="number"
          value={retirementData.annualInterestRate === 0 ? "" : retirementData.annualInterestRate}
          onChange={(e) => handleInputChange("annualInterestRate", e.target.value)}
        />
      </label>
      <label>
        Add Pension Pots:
        <input type="number" value={addedPot} onChange={(e) => setAddedPot(e.target.value)} />
      </label>
      <p>Added pots: {retirementData.currentPots.map((pot) => pot + "£").join(" - ")}</p>
      <button onClick={addPot}>Add Pot</button>
      <button onClick={() => (areRequiredFilled ? onSubmit(retirementData) : alert("Some required field is missing"))}>
        Submit
      </button>
    </div>
  );
};
