import { validateRegister } from './AuthLogic'

const testData = {
    goodEmail: 'email@email.com',
    badEmail: 'zzz@zzz',
    password: 'zzz',
    verifyPassword: 'zzz',
    first_name: 'ZZ',
    last_name: 'TOP',
    noMatch: 'noMatchpassword'
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
test('returns a string error message params are wrong', () => {
    let result = validateRegister(testData.goodEmail, testData.password, testData.first_name, testData.verifyPassword)
    expect(typeof result).toBe('string')
})
test('to give an error message when fist param is not an email', () => {
    let result = validateRegister(testData.badEmail, testData.password,testData.verifyPassword, testData.first_name, testData.last_name)
    expect(result).toBe('Please enter a valid email address.')
})
test('to give a specific error when passwords do not match', ()=>{
    //validateRegister(email, password, firstName, lastName, verifyPassword)
    let result = validateRegister(testData.goodEmail, testData.password, testData.first_name, testData.last_name, testData.noMatch)
    expect(result).toBe('Passwords do not match.  Please try again.')
})
test('to give a specific error when there is no first name passed in', ()=>{
    let result = validateRegister(testData.goodEmail, testData.password, null, testData.last_name, testData.verifyPassword)
    expect(result).toBe('Please enter a first name.')
})
test('to give a specific error when there is no last name passed in', () => {
    let result = validateRegister(testData.goodEmail, testData.password, testData.first_name, null, testData.verifyPassword)
    expect(result).toBe('Please enter a last name.')
})

