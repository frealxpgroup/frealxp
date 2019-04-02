import { validateRegister } from './AuthLogic'

const testData = {
    email: 'zzz@zzz',
    password: 'zzz',
    verifyPassword: 'zzz',
    first_name: 'ZZ',
    last_name: 'TOP'
}

//Matt's tests
test(
    'Jest works', () => {
        expect('string').toBe('string');
        expect(2).toBe(2);
    }
)
test('function should exist', () => {
    expect(validateRegister).toBeDefined();
})

test('function should return a string', () => {
    let result = validateRegister(testData.email)
    expect(typeof result).toBe('string')
})

test('function should return a string', () => {
    let result = validateRegister(testData.email, testData.password)
    expect(typeof result).toBe('string')
})
test('function should return a string', () => {
    let result = validateRegister(testData.email, testData.password, testData.verifyPassword)
    expect(typeof result).toBe('string')
})

//Chris's tests
test('function should return a string', () => {
    let result = validationRegister()
})

