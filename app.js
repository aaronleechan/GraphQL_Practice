const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express();
app.use(bodyParser.json());

app.use(isAuth);


app.use('/graphql',graphqlHttp({
    //pass two proptery
    //schema property
    //rootValue, which need to pass all resolver funtion in it. 
    //Resolver function need to match our schema by name
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true

}));

// mongoose.connect(
//     `mongodb+srv://
//     ${process.env.MONGO_USER}:
//     ${process.env.MONGO_PASSWORD}
//     @naythar-udexy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
//     ).then( () => {
//         app.listen(4000);
//         console.log("Successfully Connected " + res);
//     }).catch(err => {
//         console.log("Fail To Connect " + err);
//     });
mongoose.connect('mongodb://localhost:27017/naythar', {useNewUrlParser: true});
app.listen(4000);