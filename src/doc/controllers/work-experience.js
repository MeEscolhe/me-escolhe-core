const withoutParameters = {
  get: 
  {
    tags: ["Work Experience"],
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
                $ref: "#/components/schemas/work-experience",
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
              role: 
              {
                type: "String",
                example: "Developer",
              },

              institution: 
              {
                type: "String",
                example: "Microsoft",
              },

              durationInMonths: 
              {
                type: "Number",
                example: 5,
              },

              initialDate:
              {
                type: "string",
                pattern: "/([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/",
                example: "2018-08-22"
              },
  
              finalDate:
              {
                type: "string",
                pattern: "/([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/",
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
              $ref: "#/components/schemas/work-experience",
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
  get: 
  {
    tags: ["Work Experience"],
    description: "",
    parameters: 
    [
      {
        in: "path",
        name: "id",
        schema: 
        {
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
              $ref: "#/components/schemas/work-experience",
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
              example: "The work experience with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
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
        description: "Successful.",
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
        description: "Unsuccessful.",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example: "This work experience cannot be updatedted.",
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
              $ref: "#/components/schemas/work-experience",
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
              example: "The work experience with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters };
