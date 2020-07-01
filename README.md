# Delilah-Resto

This API allows the creation and management of users, inventory and orders in the context of a food delivery buisness. It was made to be used with MYSQL databases.

## Geting Started:

Download or Clone the git repository:

    https://github.com/Ramirojos/Delilah-Resto.git

You must have Node.js installed and a database created in MYSQL. It can be remote or local. You can also dowload Visual Studio Code (if you didin't already) , for a more convinient way to navigate and modify the fies as needed. 

### Install:

First go to the database.js file in the config folder and modify the content of the variables to fit your configuration preferences.
Then run the following command in the console.

    $npm run createdb
    
This will execute the database configuration and table creation.

### Seeding

Run the following command in the console:

    $npm run populatedb
    
This will populate the users and products tables in the database with default registers. Those are in individual ".csv" files, in the setup folder (inside the config folder).
You can modify this files as needed.

### Starting the API

Run the following command:

    $npm run start

running this command will execute the connection to the database specified in the database.js file.

#### Expected Response:

    Server started on port 3000
    Executing (default): SELECT 1+1 AS result
    Database connected...

## Usage

### Important:

Please bear in mind that a significant percentage of the requests of this API are tied to the role of Administrator.

If an error ocurrs, the API will generate by console a log of what is the problem and where is located.

### User Requests:

#### Create a new user 

    POST /users/register
    
Creates a new user in the database:

>Request Body format for User creation:

    {
      "userName": "string",
      "password": "string",
      "fullName": "string",
      "email": "srting in email format",
      "contactPhone": "integer",
      "contactAddress": "tring",
       "isAdmin": int being used as a bool being 0 = "false" and 1 = "true"
    }
    
    EXAMPLE
    
    {   
      "userName": "userName",
      "password": "userpass",
      "fullName": "Test User",
      "email": "user@mail.com",
      "contactPhone": "0000000000",
      "contactAddress": "Fake Street 123",
       "isAdmin":0
    }
    
The "isAdmin" field, tells the db if the user has administrator credentials or not, being "0"= Not an Admin and "1"= Admin.
    
>Expected response 

    "Usuario creado con exito"
    
#### Login an existing user

    POST /users/login
    
Login an existing User from the database:

>Request Body format for User Login
   
    {	
      "userName": "Admin",
      "password": "adminPass"
     }
     
>Expected Response:
    
    "usuario:Admin, token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzA2NjIsImV4cCI6MTU5MzYzMjQ2Mn0.HLJlETfqnWfSTNVD-KtkrHNzHID_M3lTvhne6zdPh9M"
 
Stored inside of the token is:
  * userName.
  * userId
  * user Role.
  * security Token.
  
 #### Update an existing User:
 
    UPDATE /users/:userId
 
 >Request Body format for User Update
    
    {
	    "password":"cadmandu23",
	    "email":"nuevoEmail@mail.com",
	    "contactPhone":"1853479623",
	    "contactAddress":" otra calle 345"
     }
   
>Authorization header 
  
The token given in the Login request is needed to verify the id of the user trying to update its own information

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    Usuario con id:userId, actualizado con Exito
  
In this request the user can only edit it's password, email, phone and address; and only if the id in the request matches with the userId in the authorization token.

#### Delete an Existing User:

    DELETE /users/:userId
    
>Authorization header 
  
The token given in the Login request is needed to verify the id of the user trying to delete their registry from the database.

    'headers': 
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    Usuario con id:userId, eliminado con Exito
    
#### GET all the users in database:
 
    GET /users/
 
>Authorization header 
  
The token given in the Login request is needed to verify the user role, ONLY an administrator should be able to see this list

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    [
    {
        "userId": 1,
        "userName": "Admin",
        "password": "adminPass",
        "fullName": "Administrator",
        "email": "admin@test.com",
        "contactPhone": 1853479623,
        "contactAddress": "Admin Street 123",
        "isAdmin": 1
    },
    {
        "userId": 2,
        "userName": "testUser",
        "password": "userPass",
        "fullName": "Test User",
        "email": "test@test.com",
        "contactPhone": 12346987,
        "contactAddress": "User Street 123",
        "isAdmin": 0
    },
    {
        "userId": 3,
        "userName": "testUserTwo",
        "password": "userpass",
        "fullName": "Second Test User",
        "email": "test@test.com",
        "contactPhone": 80023545,
        "contactAddress": "User Street 456",
        "isAdmin": 0
    }
]

#### GET one user by its ID:
 
    GET /users/:userId
 
>Authorization header 
  
The token given in the Login request is needed to verify the user role and its user ID. ONLY an administrator or the user with the same id should be able to see this data.

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:
    
    [
      {
          "userId": 2,
          "userName": "testUser",
          "password": "userPass",
          "fullName": "Test User",
          "email": "user@delilah.com",
          "contactPhone": 12346987,
          "contactAddress": "User Street 123",
          "isAdmin": 0
      }
    ]


### Products Requests

#### Create a new Product:
 
    POST /products/
 
 >Request Body format for Prduct creation
    
    {
        "productName":"String",
	      "price":"integer",
	      "photoURL":"URL"
    }
    
     {
	      "productName":"Product Name",
	      "price":"150",
	      "photoURL":"https://tinyurl.com/y7sqteuq"
      }
   
>Authorization header 
  
The token given in the Login request is needed to verify that the role of the user is that of Administrator.

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    "El producto: "product name", fue creado con exito."
  
Bear in mind that ONLY a user with the role of Administartor can create a new product, and there can't be any repeated products.

#### UPDATE a Product by it's Id:
 
    UPDATE /products/:product_Id
 
 >Request Body format for Prduct creation
       
     {
	      "productName":" New Product Name",
	      "price":"150",
	      "photoURL":"https://tinyurl.com/y7sqteuq"
      }
   
>Authorization header 
  
The token given in the Login request is needed to verify that the role of the user is that of Administrator.

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    "El productocon id: product_Id, fue actualizado con exito."
  
Bear in mind that ONLY a user with the role of Administartor can update a product.

#### DELETE a Product by it's Id:
 
    DELETE /products/:product_Id
 
>Authorization header 
  
The token given in the Login request is needed to verify that the role of the user is that of Administrator.

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    "El producto con id: 1, fue eliminado exitosamente"
  
Bear in mind that ONLY a user with the role of Administrator can delete a product.

#### GET all the Products in the database:
 
    GET /products/
 
>Expected Response:
    
    This is an example:
    
    [
    {
        "product_Id": 1,
        "productName": "Chicken",
        "price": 250,
        "photoURL": "https://tinyurl.com/y8t3vcev"
    },
    {
        "product_Id": 2,
        "productName": "Salad",
        "price": 100,
        "photoURL": "https://tinyurl.com/y87rttvt"
    },
    {
        "product_Id": 3,
        "productName": "pizza",
        "price": 125,
        "photoURL": "https://tinyurl.com/y7sqteuq"
    }
]
    
  
To get the list of all aviable products a user doesn't need any kind of authorization.

#### GET a Product by it's Id:
 
    GET /products/:product_Id
 
>Expected Response: ( if product_Id = 2)

    [
      {
        "product_Id": 2,
        "productName": "Chicken",
        "price": 250,
        "photoURL": "https://tinyurl.com/y8t3vcev"
      }
    ]
  
To get the product by id a user doesn't need any kind of authorization.


### Oders Requests

#### Create a new Order:
 
    POST /orders/
 
 >Request Body format for Orders creation
 
 The data sent in the "products" parameter is an array of objects, one object per item "type".
 
    {
      "products": [
        {
            "product_Id": integer,//the id of the product
            "product_qty": integer//the amount of products
        },
        {
            "product_Id":integer,//the id of the product,
            "product_qty":integer,//the id of the product
        }
        ],
      "payment_method": "string"
    }
    
    {
      "products": [
        {
            "product_Id": 1,
            "product_qty": 10
        },
        {
            "product_Id":2,
            "product_qty":5
        }
        ],
      "payment_method": "tarjeta"
    }
   
>Authorization header 
  
The token given in the Login request is needed to verify that the user is registered in the database.

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    "Su orden fue crada con exito."
  
Bear in mind that ONLY a registered user (or the Admin) can create an Order.

#### UPDATE an Order Status:
 
    UPDATE /orders/order_Id
 
 >Request Body format for OrderStatus Update
 
    {
      "orderStatus":"in progress"// type : string
    }
   
>Authorization header 
  
The token given in the Login request is needed to verify that the user is an Administrator

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    "Orden actualizada a: (New Status)"
  
Bear in mind that ONLY an Administrator can update an Order.

#### DELETE an Order by Id:
 
    DELETE /orders/order_Id
 
>Authorization header 
  
The token given in the Login request is needed to verify that the user is an Administrator

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    "Su orden fue eliminada con exito."
  
Bear in mind that ONLY an Administrator can delete an Order.

#### GET all Orders in the database:
 
    GET /orders/
 
>Authorization header 
  
The token given in the Login request is needed to verify that the user is an Administrator

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

    [
      {
        "orderStatus": "New",
        "created_at": "2020-07-01T18:29:05.000Z",
        "order_Id": 2,
        "order_amount": 2250,
        "payment_method": "tarjeta",
        "userId": 3,
        "userName": "Usertres",
        "contactAddress": "user dos street 123"
      },
      {
        "orderStatus": "New",
        "created_at": "2020-07-01T18:48:59.000Z",
        "order_Id": 3,
        "order_amount": 2250,
        "payment_method": "tarjeta",
        "userId": 3,
        "userName": "Usertres",
        "contactAddress": "user dos street 123"
      }
  ]
  
Bear in mind that ONLY an Administrator can see the order list. This is a conensed view of the orders. For a more detailed one refer to "GET /orders/order_Id".

#### GET an Orders by Id:
 
    GET /orders/order_Id
 
>Authorization header 
  
The token given in the Login request is needed to verify that the user is an Administrator

    'headers':
      {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiaXNBZG1pbiI6MSwidXNlcklkIjoxLCJpYXQiOjE1OTM2MzE4MTAsImV4cCI6MTU5MzYzMzYxMH0.OP42xe-OkogpSYaOauFCexxE2ZCQ4R8n_FZMzyyXdwE'
      }
     
>Expected Response:

The response in this case can be of two types, depending on the nature of the order.

If the order only contains one kind of product, the response will be:

    [
      {
          "orderStatus": "New",
          "created_at": "2020-07-01T18:29:05.000Z",
          "order_Id": 2,
          "order_amount": 2250,
          "payment_method": "tarjeta",
          "userId": 3,
          "userName": "Usertres",
          "password": "userpass",
          "fullName": "Usuassso dos de Muestra",
          "email": "ussdos@delilah.com",
          "contactPhone": 80023545,
          "contactAddress": "user dos street 123",
          "isAdmin": 0,
          "product_order_id": 3,
          "product_Id": 3,
          "product_qty": 10
      }
    ]

If the order contains more than one kind of product, then the response will be one Array of objects, one object per kind of product. 
For example, if the order contains two different products, the response would be an array of two objects with the properties of:

    "product_order_id"
    "product_Id"
    "product_qty"
    
 Will have the data of it's respective products.

The "product_order_id" propertie is a refference to the column with the same name in the JOINER TABLE "product_order"

Bear in mind that ONLY an Administrator can see the order list.

## Dependencies

 * [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
 * [csv-parser](https://www.npmjs.com/package/csv-parser) - CSV Files parsing into JSON.
 * [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
 * [file-system](https://www.npmjs.com/package/file-system) - Used in tandem with csv-parser
 * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
 * [moment](https://www.npmjs.com/package/moment) - JavaScript date library for parsing, validating, manipulating, and formatting dates.
 * [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js
 * [sequelize](https://www.npmjs.com/package/sequelize) - Multi dialect ORM for Node.JS
 
 ## Author

* Ramiro José Marugo(https://github.com/Ramirojos)







    

