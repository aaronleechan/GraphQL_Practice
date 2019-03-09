//Create A Product

mutation{
createProduct(productInput:
    {
    product_name:"红烧牛肉面",
        price: 1.99,
        imageurl:"https://s3-us-west-1.amazonaws.com/naythar.com/%E5%BA%B7%E5%B8%88%E5%82%85.jpg",
    date: "2019-02-12T15:20:20.650Z",
    brandID: "C00001"
    })


//Fetch Data
query{
    products{
      product_name
    }
  }