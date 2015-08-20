//
// Eric Morgan
// Copyright (c) 2014. 
//

// Implementation of the Shunting Yard algorithm.
var swisscalc = swisscalc || {};
swisscalc.lib = swisscalc.lib || {};
swisscalc.lib.shuntingYard = function() { 
	this._numOpenParen 	= 0;
	this._operands 		= [];
	this._operators 	= [];
	this._actionBuffer 	= [];
};

// Peeks highest value on stack. Returns 0 if empty. 
swisscalc.lib.shuntingYard.prototype.peekOperand = function() {
	var len = this._operands.length;
	return (len !== 0) ? this._operands[len-1] : 0.0;
};

// Pops highest value on stack. Returns 0 if empty.
swisscalc.lib.shuntingYard.prototype.popOperand = function() {
	var len = this._operands.length;
	return (len !== 0) ? this._operands.pop() : 0.0;
};

// Returns number of operands.
swisscalc.lib.shuntingYard.prototype.numOperands = function() {
	return this._operands.length;
};

// Pops highest operator on stack.
swisscalc.lib.shuntingYard.prototype.popOperator = function() {
	return this._actionBuffer.pop();
};

// Returns number of operators.
swisscalc.lib.shuntingYard.prototype.numOperators = function() {
	return this._actionBuffer.length;
};

// Returns true if currently evaluating sub-expression.
swisscalc.lib.shuntingYard.prototype.inSubExpression = function() {
	return this._numOpenParen > 0;
};

// Clears all stacks.
swisscalc.lib.shuntingYard.prototype.clear = function() {
	this._operands.length = 0;
	this._operators.length = 0;
	this._actionBuffer.length = 0;
};

// Empties the stack and returns the final evaluation.
swisscalc.lib.shuntingYard.prototype.evaluate = function() {
	// Push all _actionBuffer to _operators...
    for (var i = 0; i < this._actionBuffer.length; i++)
        this._operators.push(this._actionBuffer[i]);
    this._actionBuffer.length = 0;
		
	// Evaluate all _operators...
	while (this._operators.length > 0) {
		var operator = this._operators.pop();
		this.applyOperator(operator);
	}
	
	// Check for errors and return result...
	if (this._operands.length != 1)
		console.error("Invalid operand length (" + this._operands.length + ")");
        
	return this._operands.pop();
};

// Evaluates the given operator and adds result to _operands.
swisscalc.lib.shuntingYard.prototype.applyOperator = function(operator) {
	var val = operator.evaluate(this);
	this.addOperand(val);
};

// Adds an operand to the stack.
swisscalc.lib.shuntingYard.prototype.addOperand = function(operand) {
	this._operands.push(operand);
};

// Adds the given operator.
swisscalc.lib.shuntingYard.prototype.addOperator = function(operator) {
	if (operator.IsOpenParen) {
		this.addOpenParen(operator);
	} else if (operator.IsCloseParen) {
		this.addCloseParen(operator);
	} else if (operator.Arity == swisscalc.lib.operator.ARITY_NULLARY) {
		this.addNullaryOperator(operator);
	} else if (operator.Arity == swisscalc.lib.operator.ARITY_UNARY) {
		this.addUnaryOperator(operator);
	} else if (operator.Arity == swisscalc.lib.operator.ARITY_BINARY) {
		this.addBinaryOperator(operator);
	}
};

// Evaluates the NullaryOperator and pushes result to stack.
swisscalc.lib.shuntingYard.prototype.addNullaryOperator = function(operator) {
	this.applyOperator(operator);
};

// Evaluates the NullaryOperator and pushes result to stack.
swisscalc.lib.shuntingYard.prototype.addUnaryOperator = function(operator) {
	this.applyOperator(operator);
};

// First adds operator to _actionBuffer before committing to anything.
swisscalc.lib.shuntingYard.prototype.addBinaryOperator = function(operator) {
	// If not parenthesis, perform precedence checks as usual...
	while (this._actionBuffer.length > 0)
	{
		// If previous is not higher, exit...
		var abLen = this._actionBuffer.length;
		if (!this._actionBuffer[abLen-1].isHigherPrecedence(operator))
			break;
			
		var prevOperator = this._actionBuffer.pop();
		this.applyOperator(prevOperator);
	}
	
	this._actionBuffer.push(operator);
};

// Adds the open parenthesis operator. Just adds to _actionBuffer.
swisscalc.lib.shuntingYard.prototype.addOpenParen = function(operator) {
	this._actionBuffer.push(operator);
	this._numOpenParen++;
};

// Adds the close parenthesis operator. Pops operators until open is reached.
swisscalc.lib.shuntingYard.prototype.addCloseParen = function(operator) {
	// Ignore if no open parentheses...
	if (this._numOpenParen === 0)
		return;
		
	this._numOpenParen--;
	while (this._actionBuffer.length > 0)
	{
		// If encountered an open paren, return...
		var nextOperator = this._actionBuffer.pop();
		if (nextOperator.IsOpenParen)
			return;
			
		// Evaluate the operator and then push it as an operand...
		this.applyOperator(nextOperator);
	}
};