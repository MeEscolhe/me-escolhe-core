const withoutParameters = 
{
    get: 
    {
      tags: ["Skill"],
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
                  $ref: "#/components/schemas/skill",
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
                example: "No skills to show.",
                enum: ["No skills to show."],
              },
            },
          },
        },
      },
    },

    post: 
    {
      tags: ["Skill"],
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

                "languages": 
                {
                  type: "array",
                  items: 
                  {
                    type: "objectId",
                  },
                },

                "soft": 
                {
                  type: "array",
                  items: 
                  {
                    type: "objectId",
                  },
                },

                "hard": 
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
                $ref: "#/components/schemas/skill",
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
                example: "This skill cannot be created.",
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
      tags: ["Skill"],
      description: "",
      parameters: 
      [
        {
          name: "id",
          in: "path",
          description: "ID of skill",
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
              $ref: "#/components/schemas/skill",
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
                $ref: "#/components/schemas/skill",
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
                example: "This skill cannot be created.",
              },
            },
          },
        },
      },
    },

    delete: 
    {
      tags: ["Skill"],
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
                $ref: "#/components/schemas/skill",
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
                example: "The skill with the given id was not found.",
              },
            },
          },
        },
      },
    },
  };
  
  module.exports = { withParameters, withoutParameters };
  
