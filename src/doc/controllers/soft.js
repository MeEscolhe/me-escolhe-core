const withoutParameters = 
{
    get: 
    {
      tags: ["Soft"],
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
                  $ref: "#/components/schemas/soft-skill",
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
                example: "No soft skills to show.",
                enum: ["No soft skills to show."],
              },
            },
          },
        },
      },
    },

    post: 
    {
      tags: ["Soft"],
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
                  example: "resiliência"
            
                },

  
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
                $ref: "#/components/schemas/soft-skill",
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
                example: "This soft skill cannot be created.",
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
      tags: ["Soft"],
      description: "",
      parameters: 
      [
        {
          name: "id",
          in: "path",
          description: "ID of soft skill",
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
              $ref: "#/components/schemas/soft-skill",
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
                $ref: "#/components/schemas/soft-skill",
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
                example: "This soft skill cannot be created.",
              },
            },
          },
        },
      },
    },

    delete: 
    {
      tags: ["Soft"],
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
                $ref: "#/components/schemas/soft-skill",
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
                example: "The soft skill with the given id was not found.",
              },
            },
          },
        },
      },
    },
  };
  
  module.exports = { withParameters, withoutParameters };
  
