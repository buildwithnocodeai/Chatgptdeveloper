export interface TestResult {
    accuracy: number;
    wpm: number;
    timeTaken: number; // in seconds
}

export interface UserInput {
    inputText: string;
    typedText: string;
}