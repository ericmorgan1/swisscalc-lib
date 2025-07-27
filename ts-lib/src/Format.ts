//
// Eric Morgan
// Copyright (c) 2014.
//

export default class Format {
    // Adds commas to the given numeric-string to group digits.
    public static groupDigits(number: number | string): string {
        // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript/2901298#2901298
        const parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    // Formats the given number as a US currency string
    public static asUSCurrency(number: number) {
        let s = number.toFixed(2);
        s = Format.groupDigits(s);
        return (s.charAt(0) == "-") ? "-$" + s.substring(1) : "$" + s;
    };
}
