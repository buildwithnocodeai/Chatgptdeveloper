export function calculateSpeed(charactersTyped: number, timeTakenInSeconds: number): number {
    const wordsTyped = charactersTyped / 5; // Average word length is considered to be 5 characters
    const minutesTaken = timeTakenInSeconds / 60;
    return wordsTyped / minutesTaken;
}