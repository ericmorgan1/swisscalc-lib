//
// Eric Morgan
// Copyright (c) 2014. 
//

// Class for displaying/storing the memory on a calculator.

var swisscalc = swisscalc || {};
swisscalc.display = swisscalc.display || {};
swisscalc.display.memoryDisplay = function() { 
	this._display = "";
	this._memValue = 0;
	this._hasMemory = false;
};

// Returns true if memory is set.
swisscalc.display.memoryDisplay.prototype.hasMemory = function() {
	return this._hasMemory;
};

// Returns current display
swisscalc.display.memoryDisplay.prototype.getCurrentDisplay = function() {
	return this._display;
};

// Returns memory value.
swisscalc.display.memoryDisplay.prototype.memoryRecall = function() {
	return this._memValue;
};

// Sets the memory to the given value.
swisscalc.display.memoryDisplay.prototype.memorySet = function(val) {
	this._hasMemory = true;
	this._memValue = val;
	this._display = "M";
};

// Adds given number to the memory.
swisscalc.display.memoryDisplay.prototype.memoryPlus = function(val) {
	this._hasMemory = true;
	this._memValue += val;
	this._display = "M";
};

// Subtracts the given value from memory.
swisscalc.display.memoryDisplay.prototype.memoryMinus = function(val) {
	this._hasMemory = true;
	this._memValue -= val;
	this._display = "M";
};

// Clears the memory.
swisscalc.display.memoryDisplay.prototype.memoryClear = function() {
	this._hasMemory = false;
	this._memValue = 0;
	this._display = "";
};
