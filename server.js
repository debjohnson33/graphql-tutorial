var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

var root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation comes from Jesus';
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL APU server at localhost:4000/graphql');

// graphql(schema, '{ hello }', root).then((response) => {
//     console.log(response);
// });