# swisscalc-lib
JavaScript library for building a calculator

## Usage

Include the files...

```html
<script src="swisscalc.lib.format.js"></script>
<script src="swisscalc.lib.operator.js"></script>
<script src="swisscalc.lib.operatorCache.js"></script>
<script src="swisscalc.lib.shuntingYard.js"></script>
<script src="swisscalc.calc.calculator.js"></script>
```

Use the commands...

```javascript
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
```
