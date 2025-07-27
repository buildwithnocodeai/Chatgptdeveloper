import { TypingTest } from './components/TypingTest';

class App {
    private typingTest: TypingTest;

    constructor() {
        this.typingTest = new TypingTest();
        this.initialize();
    }

    private initialize() {
        this.typingTest.startTest();
    }
}

const app = new App();