function addNumebers(num1, num2) {
  return num1 + num2;
}

describe('Example test', () => {
  it('equals true', () => {
    expect(true).toEqual(true);
    expect(true).toEqual(false);
  });
});

describe('addNumbers', () => {
  it('should add two numbers', () => {
    expect(addNumebers(1, 2)).toEqual(3);
  });
});
