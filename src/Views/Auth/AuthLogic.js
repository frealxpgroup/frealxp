export function validateRegister(email, password, firstName, lastName, verifyPassword){
    let emailValid = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)
    if (!emailValid) {
        return 'Please enter a valid email address.';
    } else if (!password) {
        return 'Please enter a password.';
    } else if (password !== verifyPassword) {
        return 'Passwords do not match.  Please try again.';
    } else if (!firstName) {
        return 'Please enter a first name.';
    } else if (!lastName) {
        return 'Please enter a last name.';
    } 
}