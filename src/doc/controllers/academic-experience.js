const withoutParameters = 
{
  get: 
  {
    tags: ["Academic Experience"],
    description: "",
    parameters: [],
    responses: 
    {
      200: 
      {
        description: "Successful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "array",
              items: 
              {
                $ref: "#/components/schemas/academic-experience",
              },
            },
          },
        },
      },

      400: 
      {
        description: "Unsuccessful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example: "No academic experiences to show.",
              enum: ["No academic experiences to show."],
            },
          },
        },
      },
    },
  },

  post: 
  {
    tags: ["Academic Experience"],
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
              title: 
              {
                type: "string",
                example: "Developer",
              },

              category: 
              {
                type: "string",
                example: "Backend",
              },

              institution: 
              {
                type: "string",
                example: "UFCG",
              },

              initialDate:
              {
                type: "string",
                example: "2018-08-22"
              },
  
              finalDate:
              {
                type: "string",
                example: "2019-10-23"
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
        description: "Successful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              $ref: "#/components/schemas/academic-experience",
            },
          },
        },
      },

      400: 
      {
        description: "Unsuccessful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example: "This academic experience cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = 
{
  get: 
  {
    tags: ["Academic Experience"],
    description: "",
    parameters: 
    [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
          example: "5f5d1fa6dccfa335d03fdd3e",
        },
        required: true,
      },
    ],

    responses: 
    {
      200: 
      {
        description: "Successful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              $ref: "#/components/schemas/academic-experience",
            },
          },
          required: true,
        },
      },

      404: 
      {
        description: "Unsuccessful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example:
                "The academic experience with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Academic Experience"],
    description: "",
    parameters: 
    [
      {
        name: "id",
        in: "path",
        description: "ID of academic-experience",
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
            $ref: "#/components/schemas/academic-experience",
          },
        },
      },
    },

    responses: 
    {
      200: 
      {
        description: "Successful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              $ref: "#/components/schemas/academic-experience",
            },
          },
        },
      },

      400: 
      {
        description: "Unsuccessful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example: "This academic experience cannot be updated.",
            },
          },
        },
      },
    },
  },

  delete: 
  {
    tags: ["Academic Experience"],
    description: "",
    parameters: 
    [
      {
        in: "path",
        name: "id",
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
        description: "Successful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              $ref: "#/components/schemas/academic-experience",
            },
          },
          required: true,
        },
      },

      404: 
      {
        description: "Unsuccessful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example:
                "The academic experience with the given id was not found.",
            },
          },
        },
      },
    },
  },
};
module.exports = { withParameters, withoutParameters };
