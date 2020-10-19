const withoutParameters = 
{
    get: 
    {
      tags: ["Teacher"],
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
                  $ref: "#/components/schemas/teacher",
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
                example: "No teachers to show.",
                enum: ["No teachers to show."],
              },
            },
          },
        },
      },
    },

    post: 
    {
      tags: ["Teacher"],
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


                "description": 
                {
                  type: "String",
                  example: "Developer"
                },

                "labId":
                {
                    type: "objectId"
                },

                "managements": 
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
                $ref: "#/components/schemas/teacher",
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
                example: "This teacher cannot be created.",
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
      tags: ["Teacher"],
      description: "",
      parameters: 
      [
        {
          name: "id",
          in: "path",
          description: "ID of teacher",
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
              $ref: "#/components/schemas/teacher",
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
                $ref: "#/components/schemas/teacher",
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
                example: "This teacher cannot be created.",
              },
            },
          },
        },
      },
    },

    delete: 
    {
      tags: ["Teacher"],
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
                $ref: "#/components/schemas/teacher",
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
                example: "The teacher with the given id was not found.",
              },
            },
          },
        },
      },
    },
  };
  
  module.exports = { withParameters, withoutParameters };
  
