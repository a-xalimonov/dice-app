export type condition = (arr: number[]) => boolean
export function sumMoreThan(value: number): condition {
    return function(combination: number[]): boolean {
        const sum = combination.reduce((a, b) => a + b, 0);
        return sum > value;
    }
}
export function sumLessThan(value: number): condition {
    return function(combination: number[]): boolean {
        const sum = combination.reduce((a, b) => a + b, 0);
        return sum < value;
    }
}
export function sumEquals(value: number): condition {
    return function(combination: number[]): boolean {
        const sum = combination.reduce((a, b) => a + b, 0);
        return sum == value;
    }
}
export function sameOfAKind(diceValue: number, diceNumber: number): condition {
    return function(combination: number[]) {
        const number = combination.filter(value => value == diceValue).length;
        return number == diceNumber;
    }
}
export function sameOfAnyKind(diceNumber: number): condition {
    return function(combination: number[]) {
        const entries: number[] = [];
        for (let i of combination) {
            entries[i] = entries[i] + 1 || 1;
        }
        return entries.includes(diceNumber);
    }
}
export function walkCombinations(diceNumber: number, diceSize: number, callback: (combination: number[]) => void): void {
    const arr: number[] = [];
    (function loop(diceLeft: number) {
        for (let i = 1; i <= diceSize; i++) {
            arr[diceLeft - 1] = i;
            if (diceLeft == 1) {
                callback(arr);
            }
            else {
                loop(diceLeft - 1);
            }
        }
    })(diceNumber)
}
export function calculateProbs(diceNumber: number, diceSize: number, conditions: condition[]): number[] {
    const trueResults: number[] = new Array(conditions.length).fill(0);
    walkCombinations(diceNumber, diceSize, (combination) => {
        for (let i in conditions) {
            if (conditions[i](combination)) {
                trueResults[i] += 1;
            }
        }
    })
    const totalCombinations = diceSize ** diceNumber;
    return trueResults.map((value) => value / totalCombinations);
}