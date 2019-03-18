//Create A Product
mutation{
	createProduct(productInput:{product_name:"Anti Fog",price: 1.99,imageurl:"https://s3-us-west-1.amazonaws.com/naythar.com/antifog.jpg" , date:"2019-02-21T04:26:56.172Z"}){
    product_name
    price
  }
}

// Get Business Owner name
mutation{
	createProduct(productInput:{product_name:"Anti Fog",price: 1.99,imageurl:"https://s3-us-west-1.amazonaws.com/naythar.com/antifog.jpg" , date:"2019-02-21T04:26:56.172Z"}){
    product_name
    price
    businessowner{
      email
    }
  }
}

//Fetch single Data
query{
    products{
      product_name
    }
  }

  // Fetch Nested Data
  query{
    products{
      product_name
      businessowner{
        email
        createProduct{
          _id
        }
      }
      
    }
  }
  
  // Fetch Nested Data
  query{
    shoppingcarts{
      product{
        product_name
        date
      }
    }
  }

  // Fetch Nested Data
  query{
    shoppingcarts{
      product{
        product_name
        date
      }
      updatedAt
    }
  }

  //Shopping Cart
  mutation{
    ShoppingcartProduct(productId:"5c7b21d582b1f8240ac4e1b4"){
      _id
      user{
        email
      }
    }
  }

  // Cancel Product
  mutation{
    cancelShoppingcart(shoppingcartId:"5c8bb18d46b3dd655be37219"){
      _id
    }
  }

  query{
    products{
      _id
      product_name
      businessowner{
        email
        createProduct{
          product_name
        }
      }
    }
  }


//Postman Simple Query
{
  "query": "query { loginuser(email:\"aaron@aaron.com\", password: \"test\") {token}}"
}