# swisscalc-lib
JavaScript library that powers SwissCalc (~~http://www.swisscalc.com~~) (don't own that anymore).

Try the web version here:
https://10xdevelopment.com/other-tools/swisscalc/index.html#pageScientificLandscape

This library can be used for building a JavaScript-based calculator. 
It will accept inputs the way a person would normally enter them into a standard calculator (i.e. "1 + 2 =" instead of RPN).

This library can be used to build any type of custom calculator desired.
You just need to build a UI and connect the buttons to the functions you want to call.
It can very easily be extended to include new functions/operators.

## Usage (TypeScript Package)

**Install the package:**
`npm install swisscalc`

**Use the commands**
```ts
import { OperatorCache, Calculator } from "swisscalc";

const calc = new Calculator();

// Calculate: 12 + 45 =
calc.addDigit("1");
calc.addDigit("2");
calc.addBinaryOperator(OperatorCache.AdditionOperator);
calc.addDigit("4");
calc.addDigit("5");
calc.equalsPressed();
console.log(calc.getMainDisplay());	// 57
calc.clear();
```


## Usage (old version)

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
