class TypingTest {
    private totalCharacters: number;
    private correctCharacters: number;
    private startTime: number;
    private endTime: number;

    constructor() {
        this.totalCharacters = 0;
        this.correctCharacters = 0;
        this.startTime = 0;
        this.endTime = 0;
    }

    startTest(inputText: string): void {
        this.startTime = Date.now();
        this.totalCharacters = inputText.length;
        // Logic to capture user input and compare with inputText
    }

    calculateAccuracy(userInput: string): number {
        this.correctCharacters = this.countCorrectCharacters(userInput);
        return (this.correctCharacters / this.totalCharacters) * 100;
    }

    displayResults(): void {
        this.endTime = Date.now();
        const timeTaken = (this.endTime - this.startTime) / 1000; // in seconds
        const accuracy = this.calculateAccuracy(userInput);
        console.log(`Time taken: ${timeTaken} seconds`);
        console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
    }

    private countCorrectCharacters(userInput: string): number {
        let count = 0;
        for (let i = 0; i < Math.min(userInput.length, this.totalCharacters); i++) {
            if (userInput[i] === inputText[i]) {
                count++;
            }
        }
        return count;
    }
}