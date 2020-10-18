const withoutParameters = {
  get: {
    tags: ["Academic experience"],
    description: "",
    parameters: [],
    responses: {
      200: {
        description: "Success message",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/academic-experience",
              },
            },
          },
        },
      },
      400: {
        description: "Error",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "No academicExperiences to show.",
              enum: ["No academicExperiences to show."],
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Academic experience"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              "title: ": {
                type: "string",
                example: "teste",
              },
              "category: ": {
                type: "string",
                example: "teste",
              },
              "institution: ": {
                type: "string",
                example: "ufcg",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success message.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/academic-experience",
            },
          },
        },
      },
      400: {
        description: "Error message",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "This academic experience cannot be created.",
            },
          },
        },
      },
    },
  },
};
const withParameters = {
  put: {
    tags: ["Academic experience"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of academic-experience",
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
            $ref: "#/components/schemas/academic-experience",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success message.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/academic-experience",
            },
          },
        },
      },
      400: {
        description: "Error message",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "This academic experience cannot be created.",
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Academic experience"],
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
        description: "Success message.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/academic-experience",
            },
          },
          required: true,
        },
      },
      404: {
        description: "Error message",
        content: {
          "application/json": {
            schema: {
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
