// schema -> shape of the graph; combination of types + relationships + kinds of queries that can be made

// there are 5 basic types 
// int, float, string, boolean, ID (key for data obj)
// can also buildown types
// ! denotes required

// Query types is not optional, it is required in every GraphQL schema; specifies entry points to the graph and return types

const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        games: [Game]
        game(id: ID!): Game

        reviews: [Review]
        review(id: ID!): Review

        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput!): Game
    }
    # not an actual type but just a collection of fields; this can be used as a single arg in mutation
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
`

module.exports = {typeDefs}