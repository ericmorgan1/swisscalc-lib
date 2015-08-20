//
// Eric Morgan
// Copyright (c) 2014. 
//

// Class for implementing a tip calculator

var swisscalc = swisscalc || {};
swisscalc.calc = swisscalc.calc || {};
swisscalc.calc.tipCalculator = function() {
	this._subtotal = new swisscalc.display.fixedPointDisplay(2);	// Use fixed point display to handle keypad inputs
	this._tipPercent = 0.15;										// Store the actual value
};

// Getters...
swisscalc.calc.tipCalculator.prototype.getSubtotalValue 		= function() 		{ return this._subtotal.getDisplayValue(); };
swisscalc.calc.tipCalculator.prototype.getTipValueDecimal		= function() 		{ return this._tipPercent; };
swisscalc.calc.tipCalculator.prototype.getTipValuePercentage 	= function()		{ return this._tipPercent * 100.0; };

// Setters...
swisscalc.calc.tipCalculator.prototype.setSubtotalValue 		= function(value) 	{ this._subtotal.setDisplayValue(value); };
swisscalc.calc.tipCalculator.prototype.setTipValueDecimal 		= function(decimal) { this._tipPercent = decimal; };
swisscalc.calc.tipCalculator.prototype.setTipValuePercentage 	= function(perc) 	{ this._tipPercent = perc / 100.0; };

// Display functions...
swisscalc.calc.tipCalculator.prototype.getSubtotalDisplay 		= function() 		{ return swisscalc.lib.format.asUSCurrency(this._subtotal.getDisplayValue()); };
swisscalc.calc.tipCalculator.prototype.getTipPercentDisplay 	= function() 		{ return (this._tipPercent * 100.0).toFixed(1) + "%"; };
swisscalc.calc.tipCalculator.prototype.getTipAmountDisplay 		= function() 		{ return swisscalc.lib.format.asUSCurrency(this.getTipAmount()); };
swisscalc.calc.tipCalculator.prototype.getTipCombinedDisplay 	= function() 		{ return this.getTipPercentDisplay() + " " + this.getTipAmountDisplay(); };
swisscalc.calc.tipCalculator.prototype.getTotalDisplay 			= function()		{ return swisscalc.lib.format.asUSCurrency(this.getTotal()); };

// Returns the tip amount (in dollars)
swisscalc.calc.tipCalculator.prototype.getTipAmount = function() {
	var subtotal = this.getSubtotalValue();
	return subtotal * this._tipPercent;
};

// Returns the bill total including tip (in dollars)
swisscalc.calc.tipCalculator.prototype.getTotal = function() {
	var tipAmount = this.getTipAmount();
	return this.getSubtotalValue() + tipAmount;
};