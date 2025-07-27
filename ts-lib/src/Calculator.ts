//
// Eric Morgan
// Copyright (c) 2014.
//

import MemoryDisplay from "./MemoryDisplay";
import NumericDisplay from "./NumericDisplay";
import Operator from "./Operator";
import OperatorCache from "./OperatorCache";
import ShuntingYard from "./ShuntingYard";

// Class for implementing a basic/scientific calculator

/*
    Usage:

    const oc = swisscalc.lib.operatorCache;
    const calc = new swisscalc.calc.calculator();

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

// State...
export enum State {
    // AWAITING_OPERAND = 0,	// Don't use. Use AWAITING_OPERATOR instead
    AWAITING_OPERATOR = 0,
    ENTERING_OPERAND = 1,
    ENTERING_OPERATOR = 2
}

export default class Calculator {
    private _state: State;
    private _evaluator: ShuntingYard;
    private _mainDisplay: NumericDisplay;
    private _memoryDisplay: MemoryDisplay;

    constructor() {
        this._state = 0;	// STATE_AWAITING_OPERATOR
        this._evaluator = new ShuntingYard();
        this._mainDisplay = new NumericDisplay();
        this._memoryDisplay = new MemoryDisplay();
    }

    // Sets the current state of the calculator.
    public setState(state: State) {
        this._state = state;
    };

    // Pushes the value of _mainDisplay onto the operand stack.
    public pushDisplay() {
        const val = this._mainDisplay.getDisplayValue();
        this._evaluator.addOperand(val);
    };

    // Adds the given digit, or starts the display over if applicable.
    // Only send 0...9 or . (decimal). Must be a string. State dependent.
    public addDigit(digit: string) {
        if (this._state == State.AWAITING_OPERATOR) {
            this._mainDisplay.clear();
            this._mainDisplay.addDigit(digit);
            this.setState(State.ENTERING_OPERAND);
        }
        else if (this._state == State.ENTERING_OPERAND) {
            this._mainDisplay.addDigit(digit);
            this.setState(State.ENTERING_OPERAND);
        }
        else if (this._state == State.ENTERING_OPERATOR) {
            this._mainDisplay.clear();
            this._mainDisplay.addDigit(digit);
            this.setState(State.ENTERING_OPERAND);
        }
    };

    // Removes the last character if applicable. State dependent.
    public backspace() {
        if (this._state == State.AWAITING_OPERATOR) {
            this.setState(State.AWAITING_OPERATOR);
        }
        else if (this._state == State.ENTERING_OPERAND) {
            this._mainDisplay.backspace();
            this.setState(State.ENTERING_OPERAND);
        }
        else if (this._state == State.ENTERING_OPERATOR) {
            this.setState(State.ENTERING_OPERATOR);
        }
    };

    // Clears everything and returns to initial state
    public clear() {
        this._mainDisplay.clear();
        this._evaluator.clear();
        this.setState(State.AWAITING_OPERATOR);
    };

    // Clears the display. Does not change state. (Like pressing CE on a calculator)
    public clearEntry() {
        this._mainDisplay.clear();
    };

    // Pushes display, evaluates, and updates display.
    public equalsPressed() {
        this.pushDisplay();
        const result = this._evaluator.evaluate();
        this._mainDisplay.setDisplayValue(result);
        this.setState(State.AWAITING_OPERATOR);
    };

    // Adds parenthesis and clears display.
    public openParen() {
        this._evaluator.addOpenParen(OperatorCache.OpenParenOperator);
        this._mainDisplay.clear();
        this.setState(State.AWAITING_OPERATOR);
    };

    // If in a sub-expression, pushes display, applies parenthesis, and updates display.
    public closeParen() {
        // Ignore if not in sub-expression...
        if (!this._evaluator.inSubExpression())
            return;

        this.pushDisplay();
        this._evaluator.addCloseParen(OperatorCache.CloseParenOperator);
        this._mainDisplay.setDisplayValue(this._evaluator.popOperand());
        this.setState(State.AWAITING_OPERATOR);
    };

    // Just displays the constant on the screen.
    public addNullaryOperator(nullaryOperator: Operator) {
        const val = nullaryOperator.evaluate();
        this._mainDisplay.setDisplayValue(val);
        this.setState(State.AWAITING_OPERATOR);
    };

    // Negation is a special type of unary operator because the user must be allowed to continue typing the number.
    public negate() {
        if (this._state == State.AWAITING_OPERATOR) {
            this.addUnaryOperator(OperatorCache.NegateOperator);
        }
        else if (this._state == State.ENTERING_OPERAND) {
            this._mainDisplay.negate();
            this.setState(State.ENTERING_OPERAND);
        }
        else if (this._state == State.ENTERING_OPERATOR) {
            this.addUnaryOperator(OperatorCache.NegateOperator);
        }
    };

    // Adds the given unary operator. Do NOT send this function a NegateOperator; use negate() instead.
    public addUnaryOperator(unaryOperator: Operator) {
        this.pushDisplay();
        this._evaluator.addUnaryOperator(unaryOperator);
        this._mainDisplay.setDisplayValue(this._evaluator.popOperand());
        this.setState(State.AWAITING_OPERATOR);
    };

    // Adds the given binary operator.
    public addBinaryOperator(binaryOperator: Operator) {
        if (this._state == State.AWAITING_OPERATOR) {
            this.pushDisplay();
            this._evaluator.addBinaryOperator(binaryOperator);
            this._mainDisplay.setDisplayValue(this._evaluator.peekOperand());
            this.setState(State.ENTERING_OPERATOR);
        }
        else if (this._state == State.ENTERING_OPERAND) {
            this.pushDisplay();
            this._evaluator.addBinaryOperator(binaryOperator);
            this._mainDisplay.setDisplayValue(this._evaluator.peekOperand());
            this.setState(State.ENTERING_OPERATOR);
        }
        else if (this._state == State.ENTERING_OPERATOR) {
            // If entering an operator, we must have already had one, so we can pop..
            this._evaluator.popOperator();
            this._evaluator.addBinaryOperator(binaryOperator);
            this._mainDisplay.setDisplayValue(this._evaluator.peekOperand());
            this.setState(State.ENTERING_OPERATOR);
        }
    };

    // Returns the current display on the _mainDisplay.
    public getMainDisplay() {
        return this._mainDisplay.getCurrentDisplay();
    };

    //
    // *** MEMORY FUNCTIONS ***
    //

    // Clears the memory.
    public memoryClear() {
        this._memoryDisplay.memoryClear();
    };

    // Adds current display to memory.
    public memoryPlus() {
        const val = this._mainDisplay.getDisplayValue();
        this._memoryDisplay.memoryPlus(val);
    };

    // Subtracts current display from memory.
    public memoryMinus() {
        const val = this._mainDisplay.getDisplayValue();
        this._memoryDisplay.memoryMinus(val);
    };

    // Sets memory to the display.
    public memorySet() {
        const val = this._mainDisplay.getDisplayValue();
        this._memoryDisplay.memorySet(val);
    };

    // Displays memory on the display and waits for operator.
    public memoryRecall() {
        // Ignore if memory not set...
        if (!this._memoryDisplay.hasMemory())
            return;

        const val = this._memoryDisplay.memoryRecall();
        this._mainDisplay.setDisplayValue(val);
        this.setState(State.AWAITING_OPERATOR);
    };

}
