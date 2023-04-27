db.createCollection("charts", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [ "id", "user_email", "type", "date", "pdf", "svg", "html", "png" ],
        properties: {
          id: {
            bsonType: "int",
            description: "Id for each of the user's charts - Required."
          },
          user_email: {
            bsonType: "string",
            description: "User's email - Required."
          },
          type: {
            bsonType: "string",
            description: "Type of the chart - Required."
          },
          date: {
            bsonType: "date",
            description: "Date when user created this chart - Required."
          },
          pdf: {
            bsonType: "binData",
            description: "User's chart in pdf format - Required."
          },
          svg: {
            bsonType: "binData",
            description: "User's chart in svg format - Required."
          },
          html: {
            bsonType: "binData",
            description: "User's chart in html format - Required."
          },
          png: {
            bsonType: "binData",
            description: "User's chart in png format - Required."
          }
        }
      }
    }
  })