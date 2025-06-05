const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const { typeDefs } = require('./schema/schema');
require('dotenv').config({path: './src/config/env/.env'});
const data = require('./helpers/data');
const PORT = process.env.PORT || 3000;

const resolvers = {
    Query: {
        games() {
            return data.games; // what needs to be returned will be done by Apollo, we don't need to worry about it
        },
        game(_, args) { // we have 3 parameters - parent, args, context
            return data.games.find((game) => game.id === args.id);
        },

        authors() {
            return data.authors;
        },
        author(_, args) {
            return data.authors.find((author) => author.id === args.id);
        },

        reviews() {
            return data.reviews;
        },
        review(_, args) {
            return data.reviews.find((review) => review.id === args.id);
        },
    },
    Game: {
        reviews(parent) { // parent arg is the reference to the value returned by previous/parent resolver
            return data.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return data.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return data.authors.find((a) => a.id === parent.author_id)
        },
        game(parent) {
            return data.games.find((g) => g.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            data.games = data.games.filter((g) => g.id !== args.id)
            return data.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 100).toString()
            }
            data.games.push(game);
            return game;
        }
    }
}

// server setup
const server = new ApolloServer({
    // typeDefs -> definitions of different types of data we want to expose on our graph
    // resolvers -> handle queries based on schema and types
    typeDefs: typeDefs,
    resolvers: resolvers
})

async function start () {
    const {url} = await startStandaloneServer(server, {
        listen: {port: PORT}
    })
    console.log(`Server listening on http://localhost:${PORT}...`); 
}
start();