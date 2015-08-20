
//
// EXAMPLE
//

QUnit.test("hello test", function(assert) {
  assert.ok(1 == "1", "Passed!");
});

//
// swisscalc.lib.format
//

QUnit.test("swisscalc.lib.format.001", function(assert) {
	assert.equal(swisscalc.lib.format.groupDigits(123), "123");
	assert.equal(swisscalc.lib.format.groupDigits(123456), "123,456");
	assert.equal(swisscalc.lib.format.groupDigits(-123456), "-123,456");
	assert.equal(swisscalc.lib.format.groupDigits(12.3), "12.3");
	assert.equal(swisscalc.lib.format.groupDigits(1234.56), "1,234.56");
	assert.equal(swisscalc.lib.format.groupDigits(-1234.56), "-1,234.56");
});

QUnit.test("swisscalc.lib.format.002", function(assert) {
	assert.equal(swisscalc.lib.format.asUSCurrency(123), "$123.00");
	assert.equal(swisscalc.lib.format.asUSCurrency(123456), "$123,456.00");
	assert.equal(swisscalc.lib.format.asUSCurrency(-123456), "-$123,456.00");
	assert.equal(swisscalc.lib.format.asUSCurrency(12.3), "$12.30");
	assert.equal(swisscalc.lib.format.asUSCurrency(1234.56), "$1,234.56");
	assert.equal(swisscalc.lib.format.asUSCurrency(-1234.56), "-$1,234.56");
});

//
// swisscalc.calc.calculator
//

// 123 + 456 = (579)
QUnit.test("swisscalc.calc.calculator.001", function(assert) {
	var oc = swisscalc.lib.operatorCache;
	var calc = new swisscalc.calc.calculator();
	
	// Calculator should start out with "0" on the display...
	assert.equal(calc.getMainDisplay(), "0");
	
	// Adding 0's shouldn't do anything...
	calc.addDigit("0");
	calc.addDigit("0");
	assert.equal(calc.getMainDisplay(), "0");
	
	// Add a few numbers...
	calc.addDigit("1");
	calc.addDigit("2");
	calc.addDigit("3");
	assert.equal(calc.getMainDisplay(), "123");
	
	// Add a +...
	calc.addBinaryOperator(oc.AdditionOperator);
	assert.equal(calc.getMainDisplay(), "123");
	
	// Add a few numbers...
	calc.addDigit("4");
	calc.addDigit("5");
	calc.addDigit("6");
	assert.equal(calc.getMainDisplay(), "456");
	
	// Press =...
	calc.equalsPressed();
	assert.equal(calc.getMainDisplay(), "579");
});

// 1 + 2 * 3 + 4 = (11)
QUnit.test("swisscalc.calc.calculator.002", function(assert) {
	var oc = swisscalc.lib.operatorCache;
	var calc = new swisscalc.calc.calculator();
	
	// Add a few numbers...
	calc.addDigit("1");
	calc.addBinaryOperator(oc.AdditionOperator);
	calc.addDigit("2");
	calc.addBinaryOperator(oc.MultiplicationOperator);
	calc.addDigit("3");
	calc.addBinaryOperator(oc.AdditionOperator);
	calc.addDigit("4");
	calc.equalsPressed();
	assert.equal(calc.getMainDisplay(), "11");
});




//var x = swisscalc.calc.expressionParser.evaluate("sin(1)");
//console.log(x);