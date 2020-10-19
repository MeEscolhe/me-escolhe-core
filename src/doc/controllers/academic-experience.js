const withoutParameters = {
  get: {
    tags: ["Academic experience"],
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
                $ref: "#/components/schemas/academic-experience",
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
              example: "No academic experiences to show.",
              enum: ["No academic experiences to show."],
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
              title: {
                type: "string",
                example: "Developer",
              },

              category: {
                type: "string",
                example: "Backend",
              },

              institution: {
                type: "string",
                example: "UFCG",
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
              $ref: "#/components/schemas/academic-experience",
            },
          },
        },
      },

      400: {
        description: "POST: unsuccessful",
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
        description: "PUT: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/academic-experience",
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
              example: "This academic experience cannot be updated.",
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
        description: "DELETE: successful.",
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
        description: "DELETE: unsuccessful",
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
