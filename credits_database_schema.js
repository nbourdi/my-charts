db.createCollection("credits", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "email", "credit_balance" ],
      properties: {
        email: {
          bsonType: "string",
          description: "User's e-mail - Required."
        },
        credit_balance: {
          bsonType: "int",
          description: "Credit balance of user - Required."
        }
      }
    }
  }
})
