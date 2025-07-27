//
// Eric Morgan
// Copyright (c) 2014. 
//

import Format from "./Format";

// Class for displaying a floating-point number.
export default class NumericDisplay {
    private _display: string;
    private _groupDigits: boolean;
    private _maxLength: number;

    // Constructor.
    // groupDigits: Should digits be grouped by a comma (true/false) (default: true)
    // maxLength: Maximum number of characters to display (default: 20)
    constructor(groupDigits: boolean = true, maxLength: number = 20) {
        this._display = "0";
        this._groupDigits = (typeof groupDigits === "undefined") ? true : groupDigits;
        this._maxLength = (typeof maxLength === "undefined") ? 20 : maxLength;
    }

    // Returns current display
    public getCurrentDisplay() {
        return (this._groupDigits)
            ? Format.groupDigits(this._display)
            : this._display;
    };

    // Adds the given character to the display, if appropriate.
    // The only valid digits are: 0...9, . (decimal). Must be a string.
    public addDigit(digit: string) {
        // Don't go past maximum length...
        if (this._display.length >= this._maxLength)
            return;

        // Don't add multiple decimals...
        if (digit == "." && this._display.indexOf(".") >= 0)
            return;

        // If not a decimal and display is empty, remove 0...
        if (digit != "." && this._display == "0")
            this._display = "";

        // Add the digit to the end (note: '.' will result in '0.')...
        this._display += digit;
    };

    // Adds or removes the negative sign
    public negate() {
        const fChar = this._display.charAt(0);
        this._display = (fChar == "-") ? this._display.substring(1) : "-" + this._display;
    };

    // Removes the last character if possible
    public backspace() {
        const len = this._display.length;
        if (len == 1)
            this._display = "0";
        else if (len == 2 && this._display.charAt(0) == "-")
            this._display = "0";
        else
            this._display = this._display.substring(0, len - 1);
    };

    // Clears the display
    public clear() {
        this._display = "0";
    };

    // Returns _display as a numeric value
    public getDisplayValue() {
        return parseFloat(this._display);
    };

    // Formats the value and sets the display. "val" should be a number.
    public setDisplayValue(val: number) {
        // TODO: May need to do some formatting/rounding...
        this._display = val.toString();
    };
}

