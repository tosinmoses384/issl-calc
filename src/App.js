import LoanJS from "loanjs";
import { useState } from "react";

export default function LoanCalculator() {
  const [values, setValues] = useState({
    "loan-amount": 0,
    "interest-rate": 0,
    "loan-term": 0,
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    calculate(
      values["loan-amount"],
      values["interest-rate"],
      values["loan-term"]
    );
  };

  const calculate = (amount, rate, months) => {
    // Using the formula A = P(1 + r/n)nt

    const r = rate / 100;
    // calculate r / n  to be rn
    const rn = r / 12;

    // calculate nt
    // const nt = 12 * months;

    // calculate (1 + r/n)nt
    const addOneTorn = 1 + rn;

    // const A1 = (1 + rn) ^ months;
    const A1 = Math.pow(addOneTorn, months);

    //equation for amount
    const A2 = amount * A1;
    const roundNum = A2.toFixed(2);
    console.log(roundNum);
    const monthlyVal = roundNum / months;
    const monthlyValRound = monthlyVal.toFixed(2);

    // cal total interest
    const totalInterest = roundNum - amount;
    const totalInterestRound = totalInterest.toFixed(2);

    setMonthlyPayment(monthlyValRound);
    setTotalPayment(roundNum);
    setTotalInterest(totalInterestRound);
  };

  const amountFormat = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="App">
      <header className="App-header">
        <div className="loan-calculator-container">
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: "1px solid #d5d5d5",
              }}
              className="loan-calc-title"
            >
              <label htmlFor="loan-amount">
                <strong className="format-text">Loan Calculator</strong>
              </label>
            </div>
            <div
              style={{
                border: "1px solid #d5d5d5",
              }}
              className="loan-calc-title-l"
            >
              <label htmlFor="loan-amount">
                <b className="format-text">Enter Loan Information:</b>
              </label>
            </div>

            <div
              style={{
                border: "1px solid #d5d5d5",
                backgroundColor: "rgba(0,0,0,.03)",
              }}
              className="form-item"
            >
              <div className="form-item-no">
                <label>1)</label>
                <div className="custom-line"></div>
              </div>

              <label
                htmlFor="loan-amount"
                className="amount-desc format-text-sm"
              >
                Amount of the loan (any currency):
              </label>
              <div className="form-input">
                <div className="custom-line-1"></div>
                <input
                  type="text"
                  name="loan-amount"
                  placeholder="0"
                  value={values["loan-amount"]}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div
              style={{
                border: "1px solid #d5d5d5",
              }}
              className="form-item"
            >
              <div className="form-item-no">
                <label>2)</label>
                <div className="custom-line"></div>
              </div>

              <label
                htmlFor="loan-amount"
                className="amount-desc format-text-sm"
              >
                Annual percentage rate of interest:
              </label>
              <div className="form-input">
                <div className="custom-line-1"></div>
                <input
                  className=""
                  type="text"
                  name="interest-rate"
                  placeholder="0"
                  value={values["interest-rate"]}
                  onChange={handleInputChange}
                />
                <div className="percent-input">%</div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #d5d5d5",
                backgroundColor: "rgba(0,0,0,.03)",
              }}
              className="form-item"
            >
              <div className="form-item-no">
                <label>3)</label>
                <div className="custom-line"></div>
              </div>

              <label
                htmlFor="loan-amount"
                className="amount-desc left-1 format-text-sm"
              >
                Repayment period in months:
              </label>
              <div className="form-input">
                <div className="custom-line-1"></div>
                <input
                  type="text"
                  name="loan-term"
                  placeholder="0"
                  value={values["loan-term"]}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-btn">
              <input
                type="submit"
                value="Compute"
                className="calculate-button"
              ></input>
            </div>
          </form>

          <div
            style={{
              border: "1px solid #d5d5d5",
              backgroundColor: "rgba(0,0,0,.03)",
            }}
            className="loan-calc-title-l"
          >
            <label htmlFor="loan-amount">
              <b className="format-text">Payment Information:</b>
            </label>
          </div>

          <div
            style={{
              border: "1px solid #d5d5d5",
            }}
            className="form-item"
          >
            <div className="form-item-no">
              <label>4)</label>
              <div className="custom-line"></div>
            </div>

            <label
              htmlFor="loan-amount"
              className="amount-desc left-2 format-text-sm"
            >
              Your monthly payment will be:
            </label>
            <div className="form-input">
              <div className="custom-line-1"></div>
              <input
                type="text"
                name="monthly"
                placeholder="0"
                value={monthlyPayment === "NaN" ? "0.00" : monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              border: "1px solid #d5d5d5",
              backgroundColor: "rgba(0,0,0,.03)",
            }}
            className="form-item"
          >
            <div className="form-item-no">
              <label>5)</label>
              <div className="custom-line"></div>
            </div>

            <label
              htmlFor="loan-amount"
              className="amount-desc left-3 format-text-sm"
            >
              Your total payment will be:
            </label>
            <div className="form-input">
              <div className="custom-line-1"></div>
              <input
                type="text"
                name="total"
                placeholder="0"
                value={totalPayment === "NaN" ? "0" : totalPayment}
                onChange={(e) => setTotalPayment(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              border: "1px solid #d5d5d5",
            }}
            className="form-item"
          >
            <div className="form-item-no">
              <label>6)</label>
              <div className="custom-line"></div>
            </div>

            <label htmlFor="loan-amount" className="amount-desc format-text-sm">
              Your total interest payments will be:
            </label>
            <div className="form-input">
              <div className="custom-line-1"></div>
              <input
                type="text"
                name="interest"
                placeholder="0"
                value={totalInterest === "NaN" ? "0" : totalInterest}
                onChange={(e) => setTotalInterest(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
