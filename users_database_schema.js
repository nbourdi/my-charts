db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [ "email" ],
      properties: {
        email: {
          bsonType: "string",
          description: "User's e-mail - Required."
        },
        last_login: {
          bsonType: "date",
          description: "Last login of user - Optional."
        }
      }
    }
  }
})