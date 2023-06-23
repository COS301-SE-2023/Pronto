const isAppClientValid = require('../../../../function/prontoAuthPreConfirmation/src/isAppClientValid');
const ROLE = require('../../../../function/prontoAuthPreConfirmation/src/roles');
describe('isAppClientValid', () => {
    test('should throw Unrecognised user pool app client ID', async () => {
        
    })
    test('should throw Invalid User Role', () => {
        const nullClientID = null;
        const nullRole = null;
        expect( () => { isAppClientValid(nullClientID,nullRole)}).toThrow('Invalid User Role');
    })
    test('should throw Unrecognised user pool app client ID', () => {
        const nullClientID = null;
        expect( () => { isAppClientValid(nullClientID,ROLE.Lecture)}).toThrow(/^Unrecognised user pool app client ID=/);
    })
    test
})