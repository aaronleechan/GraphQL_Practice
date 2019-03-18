const authUserResolver = require('./authuser')
const authBusinessownerResolver = require('./authbusinessowner')
const productResolver = require('./product')
const shoppingResolver = require('./shopping')

const rootResolver = {
    ...authBusinessownerResolver,
    ...authUserResolver,
    ...productResolver,
    ...shoppingResolver
};

module.exports = rootResolver