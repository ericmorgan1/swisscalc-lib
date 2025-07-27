//
// Eric Morgan
// Copyright (c) 2014.
//

import ShuntingYard from "./ShuntingYard";

export enum Arity {
    Nullary = 0,
    Unary = 1,
    Binary = 2
}

export enum Associativity {
    None = 0,
    Right = 1,
    Left = 2
}

// Generic operator class. Implementation of individual operators will be defined in the OperatorCache.
// "evaluate" should be a function that takes a swisscalc.lib.shuntingYard instance as a parameter and returns the result.
export default class Operator {
    public Arity: Arity;
    public Associativity: Associativity;
    public Precedence: number;
    public NumOperands: number;
    public IsOpenParen: boolean;
    public IsCloseParen: boolean;
    public evaluate: (shuntingYard?: ShuntingYard) => number;

    constructor(arity: Arity, associativity: Associativity, precedence: number, numOperands: number, isOpenParen: boolean, isCloseParen: boolean, evaluate: (shuntingYard: any) => any) {
        this.Arity = arity;
        this.Associativity = associativity;
        this.Precedence = precedence;
        this.NumOperands = numOperands;
        this.IsOpenParen = isOpenParen;
        this.IsCloseParen = isCloseParen;
        this.evaluate = evaluate;
    }

    // Static functions
    public static degreesToRadians(degrees: number) { return degrees * (Math.PI / 180.0); };
    public static radiansToDegrees(radians: number) { return radians * (180.0 / Math.PI); };

    // Returns true if precedence is higher than given operator
    public isHigherPrecedence(operator: Operator) {
        if (this.Precedence == operator.Precedence)
            return (this.Associativity == Associativity.Left);
        return (this.Precedence > operator.Precedence);
    };
}

