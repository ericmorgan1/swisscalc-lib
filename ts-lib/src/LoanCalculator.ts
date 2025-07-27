//
// Eric Morgan
// Copyright (c) 2014.
//

import FixedPointDisplay from "./FixedPointDisplay";
import Format from "./Format";
import NumericDisplay from "./NumericDisplay";

export enum TermUnit {
    Months = 1,
    Years = 2
}

// Class for implementing a loan calculator
export default class LoanCalculator {
    private _termUnit: TermUnit;		// 1 = months, 2 =
    private _loanAmount: NumericDisplay;	// Unit: Dollars
    private _loanTerm: FixedPointDisplay;	// Unit: Months
    private _downPayment: NumericDisplay;	// Unit: Dollars
    private _interestRate: NumericDisplay;	// Unit: Decimal (I.e.

    constructor(termUnit: TermUnit = TermUnit.Months) {
        this._termUnit = termUnit;	// Default: TERM_UNIT_MONTHS
        this._loanAmount = new NumericDisplay();			// Unit: Dollars
        this._loanTerm = new FixedPointDisplay(0);		// Unit: Months
        this._downPayment = new NumericDisplay();			// Unit: Dollars
        this._interestRate = new NumericDisplay();			// Unit: Decimal (I.e. 0.01 == 1%)
    }

    // Getters...
    public getTermMonths() { const v = this._loanTerm.getDisplayValue(); return (this._termUnit == TermUnit.Months) ? v : v * 12; };
    public getTermYears() { const v = this._loanTerm.getDisplayValue(); return (this._termUnit == TermUnit.Years) ? v : v / 12; };
    public getLoanAmount() { return this._loanAmount.getDisplayValue(); };
    public getDownPayment() { return this._downPayment.getDisplayValue(); };
    public getDownPaymentPercent() { return (this.getDownPayment() / this.getLoanAmount()) * 100.0; };
    public getInterestRateDecimal() { return this._interestRate.getDisplayValue() / 100.0; };
    public getInterestRatePercentage() { return this._interestRate.getDisplayValue(); };

    // Setters...
    public setTermMonths(term: TermUnit) { this._loanTerm.setDisplayValue(term); this._termUnit = TermUnit.Months; };	// Set term in months
    public setTermYears(term: number) { this._loanTerm.setDisplayValue(term); this._termUnit = TermUnit.Years; };		// Set term in years
    public setLoanAmount(lAmount: number) { this._loanAmount.setDisplayValue(lAmount); };																// Set the loan amount
    public setDownPayment(dPayment: number) { this._downPayment.setDisplayValue(dPayment); };															// Set the down payment
    public setDownPaymentPercent(perc: number) { this._downPayment.setDisplayValue((perc / 100.0) * this.getLoanAmount()); };									// Set down payment as percentage of loan
    public setInterestRateDecimal(decimal: number) { this._interestRate.setDisplayValue(decimal * 100); };														// Set interest rate as a decimal
    public setInterestRatePercentage(perc: number) { this._interestRate.setDisplayValue(perc); };																	// Set interest rate by percentage (e.g. 12 == 12%)

    // Display functions...
    public getTermDisplay() { return this._loanTerm.getCurrentDisplay(); };
    public getLoanAmountDisplay() { return Format.asUSCurrency(this.getLoanAmount()); };
    public getDownPaymentDisplay() { return Format.asUSCurrency(this.getDownPayment()); };
    public getInterestRateDisplay() { return this._interestRate.getCurrentDisplay() + "%"; };

    // Returns the total monthly payment to be paid on this loan
    public getMonthlyPayment() {
        const n = this.getTermMonths();
        const i = this.getInterestRateDecimal() / 12.0;
        const A = this.getLoanAmount() - this.getDownPayment();

        // If no interest and no term, return full amount...
        if (i === 0 && n === 0)
            return A;

        // If no term, just return full amount...
        if (n === 0)
            return A;

        // If no interest, just divide by terms...
        if (i === 0)
            return A / n;

        // Standard formula...
        return (i * A) / (1 - Math.pow(1 + i, -1 * n));
    };

    // Returns the total payment to be paid on this loan
    public getTotalPayment(monthlyPayment: number) {
        const n = this.getTermMonths();
        return monthlyPayment * n;
    };

    // Returns the total interest to be paid on this loan
    public getTotalInterest(monthlyPayment: number) {
        const n = this.getTermMonths();
        const A = this.getLoanAmount() - this.getDownPayment();

        // If there was no term, just return 0 interest
        if (n === 0) return 0;

        return monthlyPayment * n - A;
    };

    // Returns a div containing formatted output.
    public getDisplay() {
        const div = document.createElement("div");
        this.addDisplay(div);
        return div;
    };

    // Adds the formatted output to the given div.
    public addDisplay(div: HTMLElement) {
        // Perform calculations...
        let monthlyPayment: number | string = this.getMonthlyPayment();
        let totalPayment: number | string = this.getTotalPayment(monthlyPayment);
        let totalInterest: number | string = this.getTotalInterest(monthlyPayment);

        // Set formatting...
        monthlyPayment = Format.asUSCurrency(monthlyPayment);
        totalPayment = Format.asUSCurrency(totalPayment);
        totalInterest = Format.asUSCurrency(totalInterest);

        // Build output div...
        div.style.fontFamily = "\"Lucida Console\",Monaco,monospace";
        div.style.whiteSpace = "pre";
        div.innerHTML = "";
        div.innerHTML += "  Monthly: " + monthlyPayment + "<br />";
        div.innerHTML += " Interest: " + totalInterest + "<br />";
        div.innerHTML += "    Total: " + totalPayment;
    };
}

