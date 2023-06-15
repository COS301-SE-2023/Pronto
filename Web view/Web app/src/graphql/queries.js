
export const getLecturer = `query GetLecturer($id: ID!) {
  getLecturer(id: $id) {
    id
    email
    firstname
    lastname
  }
}
`;