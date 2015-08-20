//
// Eric Morgan
// Copyright (c) 2014. 
//

// Class for implementing a basic/scientific calculator

/* 
	Usage:
	
	var oc = swisscalc.lib.operatorCache;
	var calc = new swisscalc.calc.calculator();
	
	// Calculate: 12 + 45 = 	
	calc.addDigit("1");
	calc.addDigit("2");
	calc.addBinaryOperator(oc.AdditionOperator);
	calc.addDigit("4");
	calc.addDigit("5");
	calc.equalsPressed();
	alert(calc.getMainDisplay());	// 57
	calc.clear();

*/

var swisscalc = swisscalc || {};
swisscalc.calc = swisscalc.calc || {};
swisscalc.calc.calculator = function() {
	this._state = 0;	// STATE_AWAITING_OPERATOR
	this._evaluator = new swisscalc.lib.shuntingYard();
	this._mainDisplay = new swisscalc.display.numericDisplay();
	this._memoryDisplay = new swisscalc.display.memoryDisplay();
};

// Constants...
swisscalc.calc.calculator.STATE_AWAITING_OPERAND 	= 0;	// Don't use. Use STATE_AWAITING_OPERATOR instead
swisscalc.calc.calculator.STATE_AWAITING_OPERATOR 	= 0;
swisscalc.calc.calculator.STATE_ENTERING_OPERAND	= 1;
swisscalc.calc.calculator.STATE_ENTERING_OPERATOR 	= 2;

// Sets the current state of the calculator.
swisscalc.calc.calculator.prototype.setState = function(state) {
	this._state = state;
};

// Pushes the value of _mainDisplay onto the operand stack.
swisscalc.calc.calculator.prototype.pushDisplay = function() {
	var val = this._mainDisplay.getDisplayValue();
	this._evaluator.addOperand(val);
};

// Adds the given digit, or starts the display over if applicable.
// Only send 0...9 or . (decimal). Must be a string. State dependent.
swisscalc.calc.calculator.prototype.addDigit = function(digit) {
	if (this._state == swisscalc.calc.calculator.STATE_AWAITING_OPERATOR) 
	{
		this._mainDisplay.clear();
		this._mainDisplay.addDigit(digit);
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERAND);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERAND) 
	{
		this._mainDisplay.addDigit(digit);
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERAND);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERATOR) 
	{
		this._mainDisplay.clear();
		this._mainDisplay.addDigit(digit);
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERAND);
	}
};

// Removes the last character if applicable. State dependent.
swisscalc.calc.calculator.prototype.backspace = function() {
	if (this._state == swisscalc.calc.calculator.STATE_AWAITING_OPERATOR) 
	{
		this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERAND) 
	{
		this._mainDisplay.backspace();
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERAND);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERATOR) 
	{
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERATOR);
	}
};

// Clears everything and returns to initial state
swisscalc.calc.calculator.prototype.clear = function() {
	this._mainDisplay.clear();
	this._evaluator.clear();
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};

// Clears the display. Does not change state. (Like pressing CE on a calculator)
swisscalc.calc.calculator.prototype.clearEntry = function() {
	this._mainDisplay.clear();
};

// Pushes display, evaluates, and updates display.
swisscalc.calc.calculator.prototype.equalsPressed = function() {
	this.pushDisplay();
	var result = this._evaluator.evaluate();
	this._mainDisplay.setDisplayValue(result);
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};

// Adds parenthesis and clears display.
swisscalc.calc.calculator.prototype.openParen = function() {
	this._evaluator.addOpenParen(swisscalc.lib.operatorCache.OpenParenOperator);
	this._mainDisplay.clear();
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};

// If in a sub-expression, pushes display, applies parenthesis, and updates display.
swisscalc.calc.calculator.prototype.closeParen = function() {
	// Ignore if not in sub-expression...
	if (!this._evaluator.inSubExpression())
		return;
		
	this.pushDisplay();
	this._evaluator.addCloseParen(swisscalc.lib.operatorCache.CloseParenOperator);
	this._mainDisplay.setDisplayValue(this._evaluator.popOperand());
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};

// Just displays the constant on the screen.
swisscalc.calc.calculator.prototype.addNullaryOperator = function(nullaryOperator) {
	var val = nullaryOperator.evaluate();
	this._mainDisplay.setDisplayValue(val);
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};

// Negation is a special type of unary operator because the user must be allowed to continue typing the number.
swisscalc.calc.calculator.prototype.negate = function() {
	if (this._state == swisscalc.calc.calculator.STATE_AWAITING_OPERATOR) 
	{
		this.addUnaryOperator(swisscalc.lib.operatorCache.NegateOperator);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERAND) 
	{
		this._mainDisplay.negate();
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERAND);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERATOR) 
	{
		this.addUnaryOperator(swisscalc.lib.operatorCache.NegateOperator);
	}
};

// Adds the given unary operator. Do NOT send this function a NegateOperator; use negate() instead.
swisscalc.calc.calculator.prototype.addUnaryOperator = function(unaryOperator) {
	this.pushDisplay();
	this._evaluator.addUnaryOperator(unaryOperator);
	this._mainDisplay.setDisplayValue(this._evaluator.popOperand());
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};

// Adds the given binary operator.
swisscalc.calc.calculator.prototype.addBinaryOperator = function(binaryOperator) {
	if (this._state == swisscalc.calc.calculator.STATE_AWAITING_OPERATOR) 
	{
		this.pushDisplay();
		this._evaluator.addBinaryOperator(binaryOperator);
		this._mainDisplay.setDisplayValue(this._evaluator.peekOperand());
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERATOR);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERAND) 
	{
		this.pushDisplay();
		this._evaluator.addBinaryOperator(binaryOperator);
		this._mainDisplay.setDisplayValue(this._evaluator.peekOperand());
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERATOR);
	} 
	else if (this._state == swisscalc.calc.calculator.STATE_ENTERING_OPERATOR) 
	{
		// If entering an operator, we must have already had one, so we can pop..
		this._evaluator.popOperator();
		this._evaluator.addBinaryOperator(binaryOperator);
		this._mainDisplay.setDisplayValue(this._evaluator.peekOperand());
		this.setState(swisscalc.calc.calculator.STATE_ENTERING_OPERATOR);
	}
};

// Returns the current display on the _mainDisplay.
swisscalc.calc.calculator.prototype.getMainDisplay = function() {
	return this._mainDisplay.getCurrentDisplay();
};

//
// *** MEMORY FUNCTIONS ***
//

// Clears the memory.
swisscalc.calc.calculator.prototype.memoryClear = function() {
	this._memoryDisplay.memoryClear();
};

// Adds current display to memory.
swisscalc.calc.calculator.prototype.memoryPlus = function() {
	var val = this._mainDisplay.getDisplayValue();
	this._memoryDisplay.memoryPlus(val);
};

// Subtracts current display from memory.
swisscalc.calc.calculator.prototype.memoryMinus = function() {
	var val = this._mainDisplay.getDisplayValue();
	this._memoryDisplay.memoryMinus(val);
};

// Sets memory to the display.
swisscalc.calc.calculator.prototype.memorySet = function() {
	var val = this._mainDisplay.getDisplayValue();
	this._memoryDisplay.memorySet(val);
};

// Displays memory on the display and waits for operator.
swisscalc.calc.calculator.prototype.memoryRecall = function() {
	// Ignore if memory not set...
	if (!this._memoryDisplay.hasMemory())
		return;
		
	var val = this._memoryDisplay.memoryRecall();
	this._mainDisplay.setDisplayValue(val);
	this.setState(swisscalc.calc.calculator.STATE_AWAITING_OPERATOR);
};
