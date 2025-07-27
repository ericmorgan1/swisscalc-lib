//
// Eric Morgan
// Copyright (c) 2014.
//

import FixedPointDisplay from "./FixedPointDisplay";
import Format from "./Format";

// Class for implementing a tip calculator
export default class TipCalculator {
    private _subtotal: FixedPointDisplay;
    private _tipPercent: number;

    constructor() {
        this._subtotal = new FixedPointDisplay(2);	// Use fixed point display to handle keypad inputs
        this._tipPercent = 0.15;										// Store the actual value
    }

    // Getters...
    public getSubtotalValue() { return this._subtotal.getDisplayValue(); };
    public getTipValueDecimal() { return this._tipPercent; };
    public getTipValuePercentage() { return this._tipPercent * 100.0; };

    // Setters...
    public setSubtotalValue(value: number) { this._subtotal.setDisplayValue(value); };
    public setTipValueDecimal(decimal: number) { this._tipPercent = decimal; };
    public setTipValuePercentage(perc: number) { this._tipPercent = perc / 100.0; };

    // Display functions...
    public getSubtotalDisplay() { return Format.asUSCurrency(this._subtotal.getDisplayValue()); };
    public getTipPercentDisplay() { return (this._tipPercent * 100.0).toFixed(1) + "%"; };
    public getTipAmountDisplay() { return Format.asUSCurrency(this.getTipAmount()); };
    public getTipCombinedDisplay() { return this.getTipPercentDisplay() + " " + this.getTipAmountDisplay(); };
    public getTotalDisplay() { return Format.asUSCurrency(this.getTotal()); };

    // Returns the tip amount (in dollars)
    public getTipAmount() {
        var subtotal = this.getSubtotalValue();
        return subtotal * this._tipPercent;
    };

    // Returns the bill total including tip (in dollars)
    public getTotal() {
        var tipAmount = this.getTipAmount();
        return this.getSubtotalValue() + tipAmount;
    };
}