//
// Eric Morgan
// Copyright (c) 2014. 
//

// Cache for storing operators (rather than instantiating new ones).
// To create a new operator, add it to the cache as a new swisscalc.lib.operator, filling in the properties and evaluate() function.
var swisscalc = swisscalc || {};
swisscalc.lib = swisscalc.lib || {};
swisscalc.lib.operatorCache = function() { };

swisscalc.lib.operatorCache.AdditionOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_LEFT, 2, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return op1 + op2;
});

swisscalc.lib.operatorCache.SubtractionOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_LEFT, 2, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return op2 - op1;
});

swisscalc.lib.operatorCache.MultiplicationOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_LEFT, 3, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return op1 * op2;
});

swisscalc.lib.operatorCache.DivisionOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_LEFT, 3, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return op2 / op1;
});

swisscalc.lib.operatorCache.ModulusOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_LEFT, 3, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return op2 % op1;
});

swisscalc.lib.operatorCache.ExponentialOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_RIGHT, 4, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return Math.pow(op2, op1);
});

swisscalc.lib.operatorCache.RootOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_RIGHT, 4, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return Math.pow(op2, 1.0 / op1);
});

swisscalc.lib.operatorCache.EEOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_BINARY, swisscalc.lib.operator.ASSOCIATIVITY_RIGHT, 10, 2, false, false, function(sy) {
		var op1 = sy.popOperand();
		var op2 = sy.popOperand();
		return op2 * Math.pow(10.0, op1);
});

swisscalc.lib.operatorCache.PiOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_NULLARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 0, false, false, function(sy) {
		return Math.PI;
});

swisscalc.lib.operatorCache.EOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_NULLARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 0, false, false, function(sy) {
		return Math.E;
});

swisscalc.lib.operatorCache.RandomOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_NULLARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 0, false, false, function(sy) {
		return Math.random();
});

swisscalc.lib.operatorCache.NegateOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return -1.0 * op;
});

swisscalc.lib.operatorCache.InverseOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return 1.0 / op;
});

swisscalc.lib.operatorCache.EExponentialOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.pow(Math.E, op);
});

swisscalc.lib.operatorCache.TenExponentialOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.pow(10.0, op);
});

swisscalc.lib.operatorCache.SquareRootOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.sqrt(op);
});

swisscalc.lib.operatorCache.CubeRootOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.cbrt(op);
});

swisscalc.lib.operatorCache.XSquaredOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return op * op;
});

swisscalc.lib.operatorCache.XCubedOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.pow(op, 3);
});

swisscalc.lib.operatorCache.PercentOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return op / 100.0;
});

swisscalc.lib.operatorCache.LogBase10Operator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.log(op) / Math.LN10;
});

swisscalc.lib.operatorCache.NaturalLogOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.log(op);
});

swisscalc.lib.operatorCache.SineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.sin(op);
});

swisscalc.lib.operatorCache.CosineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.cos(op);
});

swisscalc.lib.operatorCache.TangentOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.tan(op);
});

swisscalc.lib.operatorCache.ArcSineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.asin(op);
});

swisscalc.lib.operatorCache.ArcCosineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.acos(op);
});

swisscalc.lib.operatorCache.ArcTangentOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.atan(op);
});

swisscalc.lib.operatorCache.SineDegreesOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.sin(swisscalc.lib.operator.degreesToRadians(op));
});

swisscalc.lib.operatorCache.CosineDegreesOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.cos(swisscalc.lib.operator.degreesToRadians(op));
});

swisscalc.lib.operatorCache.TangentDegreesOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.tan(swisscalc.lib.operator.degreesToRadians(op));
});

swisscalc.lib.operatorCache.ArcSineDegreesOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return swisscalc.lib.operator.radiansToDegrees(Math.asin(op));
});

swisscalc.lib.operatorCache.ArcCosineDegreesOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return swisscalc.lib.operator.radiansToDegrees(Math.acos(op));
});

swisscalc.lib.operatorCache.ArcTangentDegreesOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return swisscalc.lib.operator.radiansToDegrees(Math.atan(op));
});

swisscalc.lib.operatorCache.HyperbolicSineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return 0.5 * (Math.pow(Math.E, op) - Math.pow(Math.E, -1.0 * op));
});

swisscalc.lib.operatorCache.HyperbolicCosineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return 0.5 * (Math.pow(Math.E, op) + Math.pow(Math.E, -1.0 * op));
});

swisscalc.lib.operatorCache.HyperbolicTangentOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return (1 - Math.pow(Math.E, -2.0 * op)) / (1 + Math.pow(Math.E, -2.0 * op));
});

swisscalc.lib.operatorCache.InverseHyperbolicSineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.log(op + Math.sqrt((op * op) + 1));
});

swisscalc.lib.operatorCache.InverseHyperbolicCosineOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return Math.log(op + Math.sqrt((op * op) - 1));
});

swisscalc.lib.operatorCache.InverseHyperbolicTangentOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_UNARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 1, false, false, function(sy) {
		var op = sy.popOperand();
		return 0.5 * Math.log((1 + op) / (1 - op));
});

swisscalc.lib.operatorCache.OpenParenOperator	= new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_NULLARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 0, true, false, function(sy) {
		console.error("Cannot evaluate open parenthesis.");
});

swisscalc.lib.operatorCache.CloseParenOperator = new swisscalc.lib.operator(
	swisscalc.lib.operator.ARITY_NULLARY, swisscalc.lib.operator.ASSOCIATIVITY_NONE, 0, 0, false, true, function(sy) {
		console.error("Cannot evaluate close parenthesis.");
});