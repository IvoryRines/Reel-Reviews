const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedMovieCount: Int
        savedMovies: [String]  #Update to Movie later
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
