const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Shoppingcart{
    _id: ID!
    product: Product!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Product{
    _id: ID!
    product_name: String!
    price: Float!
    imageurl: String!
    date: String!
    businessowner: BusinessOwner!
}

type User{
    _id: ID!
    email: String!
    password: String
}

type UserauthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type BusinessauthData{
    businessownerId: ID!
    token: String!
    tokenExpiration: Int!
}

type BusinessOwner{
    _id: ID!
    email: String!
    password: String
    createProduct: [Product!]
}

input ProductInput{
    product_name: String!
    price: Float!
    imageurl: String!
    date: String!
    brandID: ID
}

input UserInput{
    email: String!
    password: String!
}

input BusinessOwnerInput{
    email: String!
    password: String!
}

type RootQuery{
    products: [Product!]!
    shoppingcarts: [Shoppingcart!]!
    loginuser(email: String!,password: String!): UserauthData!
    loginbusinessowner(email: String!,password: String!): BusinessauthData!
}

type RootMutation{
    createProduct(productInput: ProductInput): Product 
    createUser(userInput: UserInput): User
    createBusinessOwner(businessownerInput: BusinessOwnerInput): BusinessOwner
    ShoppingcartProduct(productId: ID!): Shoppingcart!
    cancelShoppingcart(shoppingcartId: ID!): Product!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);