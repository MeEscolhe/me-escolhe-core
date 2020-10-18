const withoutParameters = {
  get: {
    tags: ["Phase"],
    description: "",
    parameters: [],
    responses: {
      200: {
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
                $ref: "#/components/schemas/phase",
              },
            },
          },
        },
      },
      400: {
        description: "GET: unsuccessful",
        content: 
        {
          "application/json": 
          {
            schema: 
            {
              type: "string",
              example: "No phases to show.",
              enum: ["No phases to show."],
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Phase"],
    description: "",
    parameters: [],
    requestBody: {
      content: 
      {
        "application/json": {
          schema: {
            type: "object",
            properties: 
            {
              "students: ": 
              {
                type: "array",
                items: 
                {
                  type: "number",
                },
              },

              "selectionId: ": 
              {
                type: "objectId",
              },

              "description: ": 
              {
                type: "string",
                example: "Fase de seleção de currículo",
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
              $ref: "#/components/schemas/phase",
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
              example: "This phase cannot be created.",
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
    tags: ["Phase"],
    description: "",
    parameters: 
    [
      {
        name: "id",
        in: "path",
        description: "ID of phase",
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
            $ref: "#/components/schemas/phase",
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
              $ref: "#/components/schemas/phase",
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
              example: "This phase cannot be created.",
            },
          },
        },
      },
    },
  },
  delete: 
  {
    tags: ["Phase"],
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
              $ref: "#/components/schemas/phase",
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
              example: "The phase with the given id was not found.",
            },
          },
        },
      },
    },
  },
};
module.exports = { withParameters, withoutParameters };
