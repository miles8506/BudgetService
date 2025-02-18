class Calculator {
    sum(first, second) {
        return first+second;
    }
}

describe('calculator add', function () {
    it('positive add positive', () => {
        let calculator = new Calculator();
        let sum = calculator.sum(1,2);
        expect(sum).toBe(3);
    });
});