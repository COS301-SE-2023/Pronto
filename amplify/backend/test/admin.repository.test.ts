const graphQlEndPoint = 'http://localhost:20002/graphql';
describe('Testing Queries & Mutations for Admin Table', ()=>{
    test('creating admin - without Sgining In',async()=>{
        const createAdminMutation = `mutation createAdminMutation {
            createAdmin(
              input: {firstname: "A", lastname: "B", userRole: "admin", email: "a@up.ac.za"}
            ) {
              id
            }
          }`;
        const response = await fetch(graphQlEndPoint,{
            method:'POST',
            body: JSON.stringify({
                operationName: 'createAdminMutation',
                query:createAdminMutation,
                variables:null
            })
        });
        expect(response.statusText).toBe('Unauthorized');
    });
})