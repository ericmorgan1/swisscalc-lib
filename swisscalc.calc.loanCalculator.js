//
// Eric Morgan
// Copyright (c) 2014. 
//

// Class for implementing a loan calculator

var swisscalc = swisscalc || {};
swisscalc.calc = swisscalc.calc || {};
swisscalc.calc.loanCalculator = function(termUnit) {
	this._termUnit 		= (typeof termUnit === "undefined") ? 1 : termUnit;	// Default: TERM_UNIT_MONTHS
	this._loanAmount 	= new swisscalc.display.numericDisplay();			// Unit: Dollars
	this._loanTerm 		= new swisscalc.display.fixedPointDisplay(0);		// Unit: Months
	this._downPayment 	= new swisscalc.display.numericDisplay();			// Unit: Dollars
	this._interestRate 	= new swisscalc.display.numericDisplay();			// Unit: Decimal (I.e. 0.01 == 1%)
};

// Constants...
swisscalc.calc.loanCalculator.TERM_UNIT_MONTHS = 1;
swisscalc.calc.loanCalculator.TERM_UNIT_YEARS = 2;

// Getters...
swisscalc.calc.loanCalculator.prototype.getTermMonths 				= function() { var v = this._loanTerm.getDisplayValue(); return (this._termUnit == swisscalc.calc.loanCalculator.TERM_UNIT_MONTHS) ? v : v * 12; };
swisscalc.calc.loanCalculator.prototype.getTermYears 				= function() { var v = this._loanTerm.getDisplayValue(); return (this._termUnit == swisscalc.calc.loanCalculator.TERM_UNIT_YEARS) ? v : v / 12; };
swisscalc.calc.loanCalculator.prototype.getLoanAmount 				= function() { return this._loanAmount.getDisplayValue(); };
swisscalc.calc.loanCalculator.prototype.getDownPayment 				= function() { return this._downPayment.getDisplayValue(); };
swisscalc.calc.loanCalculator.prototype.getDownPaymentPercent 		= function() { return (this.getDownPayment() / this.getLoanAmount()) * 100.0; };
swisscalc.calc.loanCalculator.prototype.getInterestRateDecimal 		= function() { return this._interestRate.getDisplayValue() / 100.0; };
swisscalc.calc.loanCalculator.prototype.getInterestRatePercentage 	= function() { return this._interestRate.getDisplayValue(); };

// Setters...
swisscalc.calc.loanCalculator.prototype.setTermMonths 				= function(term) { this._loanTerm.setDisplayValue(term); this._termUnit = swisscalc.calc.loanCalculator.TERM_UNIT_MONTHS; };	// Set term in months
swisscalc.calc.loanCalculator.prototype.setTermYears  				= function(term) { this._loanTerm.setDisplayValue(term); this._termUnit = swisscalc.calc.loanCalculator.TERM_UNIT_YEARS; };		// Set term in years
swisscalc.calc.loanCalculator.prototype.setLoanAmount 				= function(lAmount) { this._loanAmount.setDisplayValue(lAmount); };																// Set the loan amount
swisscalc.calc.loanCalculator.prototype.setDownPayment 				= function(dPayment) { this._downPayment.setDisplayValue(dPayment); };															// Set the down payment
swisscalc.calc.loanCalculator.prototype.setDownPaymentPercent 		= function(perc) { this._downPayment.setDisplayValue((perc/100.0) * this.getLoanAmount()); };									// Set down payment as percentage of loan				
swisscalc.calc.loanCalculator.prototype.setInterestRateDecimal 		= function(decimal) { this._interestRate.setDisplayValue(decimal * 100); };														// Set interest rate as a decimal
swisscalc.calc.loanCalculator.prototype.setInterestRatePercentage 	= function(perc) { this._interestRate.setDisplayValue(perc); };																	// Set interest rate by percentage (e.g. 12 == 12%)

// Display functions...
swisscalc.calc.loanCalculator.prototype.getTermDisplay				= function() { return this._loanTerm.getCurrentDisplay(); };
swisscalc.calc.loanCalculator.prototype.getLoanAmountDisplay 		= function() { return swisscalc.lib.format.asUSCurrency(this.getLoanAmount()); };
swisscalc.calc.loanCalculator.prototype.getDownPaymentDisplay 		= function() { return swisscalc.lib.format.asUSCurrency(this.getDownPayment()); };
swisscalc.calc.loanCalculator.prototype.getInterestRateDisplay 		= function() { return this._interestRate.getCurrentDisplay() + "%"; };

// Returns the total monthly payment to be paid on this loan
swisscalc.calc.loanCalculator.prototype.getMonthlyPayment = function() {
	var n = this.getTermMonths();
	var i = this.getInterestRateDecimal() / 12.0;
	var A = this.getLoanAmount() - this.getDownPayment();
	
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
swisscalc.calc.loanCalculator.prototype.getTotalPayment = function(monthlyPayment) {
	var n = this.getTermMonths();
	return monthlyPayment * n;
};

// Returns the total interest to be paid on this loan
swisscalc.calc.loanCalculator.prototype.getTotalInterest = function(monthlyPayment) {
	var n = this.getTermMonths();
	var A = this.getLoanAmount() - this.getDownPayment();
	
	// If there was no term, just return 0 interest
	if (n === 0) return 0;
		
	return monthlyPayment * n - A;
};

// Returns a div containing formatted output.
swisscalc.calc.loanCalculator.prototype.getDisplay = function() {
	var div = document.createElement("div");
	this.addDisplay(div);
	return div;
};

// Adds the formatted output to the given div.
swisscalc.calc.loanCalculator.prototype.addDisplay = function(div) {
	// Perform calculations...
	var monthlyPayment 	= this.getMonthlyPayment();
	var totalPayment   	= this.getTotalPayment(monthlyPayment);
	var totalInterest  	= this.getTotalInterest(monthlyPayment);
	
	// Set formatting...
	monthlyPayment 	= swisscalc.lib.format.asUSCurrency(monthlyPayment);
	totalPayment   	= swisscalc.lib.format.asUSCurrency(totalPayment);
	totalInterest  	= swisscalc.lib.format.asUSCurrency(totalInterest);
	
	// Build output div...
	div.style.fontFamily = "\"Lucida Console\",Monaco,monospace";
	div.style.whiteSpace = "pre";
	div.innerHTML = "";
	div.innerHTML += "  Monthly: " + monthlyPayment	+ "<br />";
	div.innerHTML += " Interest: " + totalInterest	+ "<br />";
	div.innerHTML += "    Total: " + totalPayment;
};