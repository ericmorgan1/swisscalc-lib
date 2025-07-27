//
// Eric Morgan
// Copyright (c) 2014.
//

import Operator, { Arity, Associativity } from "./Operator";
import ShuntingYard from "./ShuntingYard";

// Cache for storing operators (rather than instantiating new ones).
// To create a new operator, add it to the cache as a new swisscalc.lib.operator, filling in the properties and evaluate() function.
export default class OperatorCache {
    public static AdditionOperator = new Operator(
        Arity.Binary, Associativity.Left, 2, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return op1 + op2;
        });

    public static SubtractionOperator = new Operator(
        Arity.Binary, Associativity.Left, 2, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return op2 - op1;
        });

    public static MultiplicationOperator = new Operator(
        Arity.Binary, Associativity.Left, 3, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return op1 * op2;
        });

    public static DivisionOperator = new Operator(
        Arity.Binary, Associativity.Left, 3, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return op2 / op1;
        });

    public static ModulusOperator = new Operator(
        Arity.Binary, Associativity.Left, 3, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return op2 % op1;
        });

    public static ExponentialOperator = new Operator(
        Arity.Binary, Associativity.Right, 4, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return Math.pow(op2, op1);
        });

    public static RootOperator = new Operator(
        Arity.Binary, Associativity.Right, 4, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return Math.pow(op2, 1.0 / op1);
        });

    public static EEOperator = new Operator(
        Arity.Binary, Associativity.Right, 10, 2, false, false, function (sy: ShuntingYard) {
            const op1 = sy.popOperand();
            const op2 = sy.popOperand();
            return op2 * Math.pow(10.0, op1);
        });

    public static PiOperator = new Operator(
        Arity.Nullary, Associativity.None, 0, 0, false, false, function (sy: ShuntingYard) {
            return Math.PI;
        });

    public static EOperator = new Operator(
        Arity.Nullary, Associativity.None, 0, 0, false, false, function (sy: ShuntingYard) {
            return Math.E;
        });

    public static RandomOperator = new Operator(
        Arity.Nullary, Associativity.None, 0, 0, false, false, function (sy: ShuntingYard) {
            return Math.random();
        });

    public static NegateOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return -1.0 * op;
        });

    public static InverseOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return 1.0 / op;
        });

    public static EExponentialOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.pow(Math.E, op);
        });

    public static TenExponentialOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.pow(10.0, op);
        });

    public static SquareRootOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.sqrt(op);
        });

    public static CubeRootOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.cbrt(op);
        });

    public static XSquaredOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return op * op;
        });

    public static XCubedOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.pow(op, 3);
        });

    public static PercentOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return op / 100.0;
        });

    public static LogBase10Operator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.log(op) / Math.LN10;
        });

    public static NaturalLogOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.log(op);
        });

    public static SineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.sin(op);
        });

    public static CosineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.cos(op);
        });

    public static TangentOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.tan(op);
        });

    public static ArcSineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.asin(op);
        });

    public static ArcCosineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.acos(op);
        });

    public static ArcTangentOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.atan(op);
        });

    public static SineDegreesOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.sin(Operator.degreesToRadians(op));
        });

    public static CosineDegreesOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.cos(Operator.degreesToRadians(op));
        });

    public static TangentDegreesOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.tan(Operator.degreesToRadians(op));
        });

    public static ArcSineDegreesOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Operator.radiansToDegrees(Math.asin(op));
        });

    public static ArcCosineDegreesOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Operator.radiansToDegrees(Math.acos(op));
        });

    public static ArcTangentDegreesOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Operator.radiansToDegrees(Math.atan(op));
        });

    public static HyperbolicSineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return 0.5 * (Math.pow(Math.E, op) - Math.pow(Math.E, -1.0 * op));
        });

    public static HyperbolicCosineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return 0.5 * (Math.pow(Math.E, op) + Math.pow(Math.E, -1.0 * op));
        });

    public static HyperbolicTangentOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return (1 - Math.pow(Math.E, -2.0 * op)) / (1 + Math.pow(Math.E, -2.0 * op));
        });

    public static InverseHyperbolicSineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.log(op + Math.sqrt((op * op) + 1));
        });

    public static InverseHyperbolicCosineOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return Math.log(op + Math.sqrt((op * op) - 1));
        });

    public static InverseHyperbolicTangentOperator = new Operator(
        Arity.Unary, Associativity.None, 0, 1, false, false, function (sy: ShuntingYard) {
            const op = sy.popOperand();
            return 0.5 * Math.log((1 + op) / (1 - op));
        });

    public static OpenParenOperator = new Operator(
        Arity.Nullary, Associativity.None, 0, 0, true, false, function (sy: ShuntingYard) {
            console.error("Cannot evaluate open parenthesis.");
        });

    public static CloseParenOperator = new Operator(
        Arity.Nullary, Associativity.None, 0, 0, false, true, function (sy: ShuntingYard) {
            console.error("Cannot evaluate close parenthesis.");
        });
}




