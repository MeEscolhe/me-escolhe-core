const withoutParameters = {
  get: {
    tags: ["Experience"],
    description: "",
    parameters: [],
    responses: {
      200: {
        description: "GET: successful",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/experience",
              },
            },
          },
        },
      },
      400: {
        description: "GET: unsuccessful",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "No experiences to show.",
              enum: ["No experiences to show."],
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Experience"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              academic: {
                type: "array",
                items: {
                  type: "objectId",
                  $ref: "#/components/schemas/experience",
                },
              },
              work: {
                type: "array",
                items: {
                  type: "objectId",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "POST: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/experience",
            },
          },
        },
      },
      400: {
        description: "POST: unsuccessful.",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "This experience cannot be created.",
            },
          },
        },
      },
    },
  },
};
const withParameters = {
  put: {
    tags: ["Experience"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of experience",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/experience",
          },
        },
      },
    },
    responses: {
      200: {
        description: "PUT: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/experience",
            },
          },
        },
      },
      400: {
        description: "PUT: unsuccessful.e",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "This experience cannot be created.",
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Experience"],
    description: "",
    parameters: [
      {
        in: "path",
        name: "_id",
        schema: {
          type: "string",
          example: "5f28ac7082e88b35448255e8",
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: "DELETE: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/experience",
            },
          },
          required: true,
        },
      },
      404: {
        description: "DELETE: unsuccessful.",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "The experience with the given id was not found.",
            },
          },
        },
      },
    },
  },
};
module.exports = { withParameters, withoutParameters };