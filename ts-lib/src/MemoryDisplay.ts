//
// Eric Morgan
// Copyright (c) 2014.
//

// Class for displaying/storing the memory on a calculator.
export default class MemoryDisplay {
    private _display: string;
    private _memValue: number;
    private _hasMemory: boolean;

    constructor() {
        this._display = "";
        this._memValue = 0;
        this._hasMemory = false;
    }

    // Returns true if memory is set.
    public hasMemory() {
        return this._hasMemory;
    };

    // Returns current display
    public getCurrentDisplay() {
        return this._display;
    };

    // Returns memory value.
    public memoryRecall() {
        return this._memValue;
    };

    // Sets the memory to the given value.
    public memorySet(val: number) {
        this._hasMemory = true;
        this._memValue = val;
        this._display = "M";
    };

    // Adds given number to the memory.
    public memoryPlus(val: number) {
        this._hasMemory = true;
        this._memValue += val;
        this._display = "M";
    };

    // Subtracts the given value from memory.
    public memoryMinus(val: number) {
        this._hasMemory = true;
        this._memValue -= val;
        this._display = "M";
    };

    // Clears the memory.
    public memoryClear() {
        this._hasMemory = false;
        this._memValue = 0;
        this._display = "";
    };
}
