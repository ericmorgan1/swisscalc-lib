//
// Eric Morgan
// Copyright (c) 2014. 
//

// Class for displaying a fixed-point number.

var swisscalc = swisscalc || {};
swisscalc.display = swisscalc.display || {};

// Constructor.
// numDecimalPlaces: Number of characters to show past decimal (default: 2)
// maxLength: Maximum number of characters to display (default: 20)
swisscalc.display.fixedPointDisplay = function(numDecimalPlaces, maxLength) { 
	this._display = "";
	this._isNegative = false;
	this._numDecimalPlaces = (typeof numDecimalPlaces === "undefined") ? 2 : numDecimalPlaces;
	this._maxLength = (typeof maxLength === "undefined") ? 20 : maxLength;
};

// Returns current display
swisscalc.display.fixedPointDisplay.prototype.getCurrentDisplay = function() { 
	var str = "";
	var len = this._display.length;		// Number of characters
	var num = this._numDecimalPlaces;	// Number of decimal places
	
	// If no decimal places, handle separately...
	if (num === 0) { 
		if (len === 0) return "0";							// If no characters, return 0
		if (this._isNegative) return "-" + this._display;	// If negative, add a "-"
		return this._display;								// Otherwise, display as-is
	}
	
	if (len > num) {
		var p1  = this._display.substring(0, len - num);
		var p2  = this._display.substring(len - num, len);
		str = p1 + "." + p2;
	} else if (len == num) {
		str = "0." + this._display;
	} else if (len < num) { 
		str = "0.";
		for (var i = 0; i < num - len; i++) str += "0";
		str += this._display;
	}
	
	if (this._isNegative) str = "-" + str;
	
	return str;
};

// Adds the given character to the display, if appropriate.
// The only valid digits are: 0...9, . (decimal). Must be a string.
swisscalc.display.fixedPointDisplay.prototype.addDigit = function(digit) {
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
swisscalc.display.fixedPointDisplay.prototype.negate = function() {
	this._isNegative = !this._isNegative;
};

// Removes the last character if possible
swisscalc.display.fixedPointDisplay.prototype.backspace = function() {
	var len = this._display.length;	
	if (len == 1)
		this._display = "";
	else if (len == 2 && this._display.charAt(0) == "-")
		this._display = "";
	else
		this._display = this._display.substring(0, len - 1);
};

// Clears the display
swisscalc.display.fixedPointDisplay.prototype.clear = function() {
	this._display = "";
};

// Returns _display as a numeric value
swisscalc.display.fixedPointDisplay.prototype.getDisplayValue = function() {
	var sDisplay = this.getCurrentDisplay();
	return parseFloat(sDisplay);
};