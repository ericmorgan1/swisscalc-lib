//
// Eric Morgan
// Copyright (c) 2014.
//

// Class for displaying a fixed-point number.
export default class FixedPointDisplay {
    private _display: string;
    private _isNegative: boolean;
    private _numDecimalPlaces: number;
    private _maxLength: number;

    // Constructor.
    // numDecimalPlaces: Number of characters to show past decimal (default: 2)
    // maxLength: Maximum number of characters to display (default: 20)
    constructor(numDecimalPlaces: number = 2, maxLength: number = 20) {
        this._display = "";
        this._isNegative = false;
        this._numDecimalPlaces = (typeof numDecimalPlaces === "undefined") ? 2 : numDecimalPlaces;
        this._maxLength = (typeof maxLength === "undefined") ? 20 : maxLength;
    }

    // Returns current display
    public getCurrentDisplay() {
        let str = "";
        const len = this._display.length;		// Number of characters
        const num = this._numDecimalPlaces;	// Number of decimal places

        // If no decimal places, handle separately...
        if (num === 0) {
            if (len === 0) return "0";							// If no characters, return 0
            if (this._isNegative) return "-" + this._display;	// If negative, add a "-"
            return this._display;								// Otherwise, display as-is
        }

        if (len > num) {
            const p1 = this._display.substring(0, len - num);
            const p2 = this._display.substring(len - num, len);
            str = p1 + "." + p2;
        } else if (len == num) {
            str = "0." + this._display;
        } else if (len < num) {
            str = "0.";
            for (let i = 0; i < num - len; i++) str += "0";
            str += this._display;
        }

        if (this._isNegative) str = "-" + str;

        return str;
    };

    // Adds the given character to the display, if appropriate.
    // The only valid digits are: 0...9, . (decimal). Must be a string.
    public addDigit(digit: string) {
        // Don't go past maximum length...
        if (this._display.length >= this._maxLength)
            return;

        // Don't add decimals even though it says you can...
        if (digit == ".")
            return;

        // If display is empty, don't add any 0's...
        if (this._display.length === 0 && digit == "0")
            return;

        // Add the digit to the end (note: '.' will result in '0.')...
        this._display += digit;
    };

    // Adds or removes the negative sign
    public negate() {
        this._isNegative = !this._isNegative;
    };

    // Removes the last character if possible
    public backspace() {
        const len = this._display.length;
        if (len == 1)
            this._display = "";
        else if (len == 2 && this._display.charAt(0) == "-")
            this._display = "";
        else
            this._display = this._display.substring(0, len - 1);
    };

    // Clears the display
    public clear() {
        this._display = "";
    };

    // Returns _display as a numeric value
    public getDisplayValue() {
        const sDisplay = this.getCurrentDisplay();
        return parseFloat(sDisplay);
    };

    // Formats the value and sets the display. "val" should be a number.
    public setDisplayValue(val: number) {
        // TODO: May need to do some formatting/rounding...
        this._display = val.toString();
    };
}

