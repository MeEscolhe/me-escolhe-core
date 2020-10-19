const withoutParameters = 
{
    get: 
    {
      tags: ["Work Experience"],
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
                  $ref: "#/components/schemas/work-experience",
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
                example: "No work experiences to show.",
                enum: ["No work experiences to show."],
              },
            },
          },
        },
      },
    },

    post: 
    {
      tags: ["Work Experience"],
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
                  
                "role": 
                {
                  type: "String",
                  example: "developer"
                },

                "institution": 
                {
                  type: "String",
                  example: "Laboratório de práticas"
                },


                "durationInMonths": 
                {
                  type: "Number",
                  example: 5
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
                $ref: "#/components/schemas/work-experience",
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
                example: "This work experience cannot be created.",
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
      tags: ["Work Experience"],
      description: "",
      parameters: 
      [
        {
          name: "id",
          in: "path",
          description: "ID of work experience",
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
              $ref: "#/components/schemas/work-experience",
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
                $ref: "#/components/schemas/work-experience",
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
                example: "This work experience cannot be created.",
              },
            },
          },
        },
      },
    },

    delete: 
    {
      tags: ["Work Experience"],
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
                $ref: "#/components/schemas/work-experience",
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
                example: "The work experience with the given id was not found.",
              },
            },
          },
        },
      },
    },
  };
  
  module.exports = { withParameters, withoutParameters };
  
