//
// Eric Morgan
// Copyright (c) 2014.
//

import Operator, { Arity } from "./Operator";

// Implementation of the Shunting Yard algorithm.
export default class ShuntingYard {
    private _numOpenParen: number;
    private _operands: number[];
    private _operators: Operator[];
    private _actionBuffer: Operator[];

    constructor() {
        this._numOpenParen = 0;
        this._operands = [];
        this._operators = [];
        this._actionBuffer = [];
    }

    // Peeks highest value on stack. Returns 0 if empty.
    public peekOperand(): number {
        const len = this._operands.length;
        return (len !== 0) ? this._operands[len - 1] : 0.0;
    }

    // Pops highest value on stack. Returns 0 if empty.
    public popOperand(): number {
        const len = this._operands.length;
        return (len !== 0) ? this._operands.pop()! : 0.0;
    };

    // Returns number of operands.
    public numOperands(): number {
        return this._operands.length;
    };

    // Pops highest operator on stack.
    public popOperator(): Operator | undefined {
        return this._actionBuffer.pop();
    };

    // Returns number of operators.
    public numOperators(): number {
        return this._actionBuffer.length;
    };

    // Returns true if currently evaluating sub-expression.
    public inSubExpression(): boolean {
        return this._numOpenParen > 0;
    };

    // Clears all stacks.
    public clear(): void {
        this._operands.length = 0;
        this._operators.length = 0;
        this._actionBuffer.length = 0;
    };

    // Empties the stack and returns the final evaluation.
    public evaluate(): number {
        // Push all _actionBuffer to _operators...
        for (let i = 0; i < this._actionBuffer.length; i++)
            this._operators.push(this._actionBuffer[i]);
        this._actionBuffer.length = 0;

        // Evaluate all _operators...
        while (this._operators.length > 0) {
            const operator = this._operators.pop()!;
            this.applyOperator(operator);
        }

        // Check for errors and return result...
        if (this._operands.length != 1)
            console.error("Invalid operand length (" + this._operands.length + ")");

        return this._operands.pop()!;
    };

    // Evaluates the given operator and adds result to _operands.
    public applyOperator(operator: Operator) {
        const val = operator.evaluate(this);
        this.addOperand(val);
    };

    // Adds an operand to the stack.
    public addOperand(operand: number) {
        this._operands.push(operand);
    };

    // Adds the given operator.
    public addOperator(operator: Operator) {
        if (operator.IsOpenParen) {
            this.addOpenParen(operator);
        } else if (operator.IsCloseParen) {
            this.addCloseParen(operator);
        } else if (operator.Arity == Arity.Nullary) {
            this.addNullaryOperator(operator);
        } else if (operator.Arity == Arity.Unary) {
            this.addUnaryOperator(operator);
        } else if (operator.Arity == Arity.Binary) {
            this.addBinaryOperator(operator);
        }
    };

    // Evaluates the NullaryOperator and pushes result to stack.
    public addNullaryOperator(operator: Operator) {
        this.applyOperator(operator);
    };

    // Evaluates the NullaryOperator and pushes result to stack.
    public addUnaryOperator(operator: Operator) {
        this.applyOperator(operator);
    };

    // First adds operator to _actionBuffer before committing to anything.
    public addBinaryOperator(operator: Operator) {
        // If not parenthesis, perform precedence checks as usual...
        while (this._actionBuffer.length > 0) {
            // If previous is not higher, exit...
            const abLen = this._actionBuffer.length;
            if (!this._actionBuffer[abLen - 1].isHigherPrecedence(operator))
                break;

            const prevOperator = this._actionBuffer.pop()!;
            this.applyOperator(prevOperator);
        }

        this._actionBuffer.push(operator);
    };

    // Adds the open parenthesis operator. Just adds to _actionBuffer.
    public addOpenParen(operator: Operator) {
        this._actionBuffer.push(operator);
        this._numOpenParen++;
    };

    // Adds the close parenthesis operator. Pops operators until open is reached.
    public addCloseParen(_operator: Operator) {
        // Ignore if no open parentheses...
        if (this._numOpenParen === 0)
            return;

        this._numOpenParen--;
        while (this._actionBuffer.length > 0) {
            // If encountered an open paren, return...
            const nextOperator = this._actionBuffer.pop()!;
            if (nextOperator.IsOpenParen)
                return;

            // Evaluate the operator and then push it as an operand...
            this.applyOperator(nextOperator);
        }
    };
}
