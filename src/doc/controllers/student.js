const withoutParameters = 
{
    get: 
    {
      tags: ["Student"],
      description: "",
      parameters: [],
      responses: 
      {
        200: 
        {
          description: "GET: successful",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                type: "array",
                items: 
                {
                  $ref: "#/components/schemas/student",
                },
              },
            },
          },

        },

        400: 
        {
          description: "GET: unsuccessful",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                type: "string",
                example: "No students to show.",
                enum: ["No students to show."],
              },
            },
          },
        },
      },
    },

    post: 
    {
      tags: ["Student"],
      description: "",
      parameters: [],
      requestBody: 
      {
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "object",
              properties: 
              {

                "registration": 
                {
                  type: "number",
                  example: 116133454
                },

                "name": 
                {
                  type: "String",
                  example: "Thomas"
                },

                "email": 
                {
                  type: "String",
                  example: "thomas.lopes@ccc.ufcg.edu.br"
                },

                "cra": 
                {
                  type: "number",
                  example: 7.7
                },

                "description": 
                {
                  type: "String",
                  example: "Developer"
                },

                "skills": 
                {
                  type: "array",
                  items: 
                  {
                    type: "objectId",
                  },
                },

                "experiences": 
                {
                  type: "array",
                  items: 
                  {
                    type: "objectId",
                  },
                },

                "phases": 
                {
                  type: "array",
                  items: 
                  {
                    type: "objectId",
                  },
                }
  
              },
            },
          },
        },

      },

      responses: 
      {
        200: 
        {
          description: "POST: successful.",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                $ref: "#/components/schemas/student",
              },
            },
          },
        },

        400: 
        {
          description: "POST: unsuccessful",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                type: "string",
                example: "This student cannot be created.",
              },
            },
          },
        },
      },
    },
  };
  
  const withParameters = 
  {
    put: 
    {
      tags: ["Student"],
      description: "",
      parameters: 
      [
        {
          name: "id",
          in: "path",
          description: "ID of student",
          required: true,
          schema: 
          {
            type: "string",
          },
        },
      ],

      requestBody: 
      {
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              $ref: "#/components/schemas/student",
            },
          },
        },
      },

      responses: 
      {
        200: 
        {
          description: "PUT: successful.",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                $ref: "#/components/schemas/student",
              },
            },
          },
        },

        400: 
        {
          description: "PUT: unsuccessful",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                type: "string",
                example: "This student cannot be created.",
              },
            },
          },
        },
      },
    },

    delete: 
    {
      tags: ["Student"],
      description: "",
      parameters: 
      [
        {
          in: "path",
          name: "_id",
          schema: 
          {
            type: "string",
            example: "5f28ac7082e88b35448255e8",
          },
          required: true,
        },
      ],

      responses: 
      {
        200: 
        {
          description: "DELETE: successful.",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                $ref: "#/components/schemas/student",
              },
            },
            required: true,
          },
        },
  
        404: 
        {
          description: "DELETE: unsuccessful",
          content: 
          {
            "application/json": 
            {
              schema: 
              {
                type: "string",
                example: "The student with the given id was not found.",
              },
            },
          },
        },
      },
    },
  };
  
  module.exports = { withParameters, withoutParameters };
  
