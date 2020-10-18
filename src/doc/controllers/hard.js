const withoutParameters = {
  get: {
    tags: ["Hard skill"],
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
                $ref: "#/components/schemas/hard-skill",
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
              example: "No hard skills to show.",
              enum: ["No hard skills to show."],
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Hard skill"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "name: ": {
                type: "string",
                example: "Java",
              },
              "category: ": {
                type: "number",
                example: 2,
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
              $ref: "#/components/schemas/hard-skill",
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
              example: "This hard skill cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  put: {
    tags: ["Hard skill"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of hard-skill",
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
            $ref: "#/components/schemas/hard-skill",
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
              $ref: "#/components/schemas/hard-skill",
            },
          },
        },
      },
      400: {
        description: "PUT: unsuccessful",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "This hard skill cannot be created.",
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Hard skill"],
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
              $ref: "#/components/schemas/hard-skill",
            },
          },
          required: true,
        },
      },

      404: {
        description: "DELETE: unsuccessful",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "The hard skill with the given id was not found.",
            },
          },
        },
      },
    },
  },
};
module.exports = { withParameters, withoutParameters };
