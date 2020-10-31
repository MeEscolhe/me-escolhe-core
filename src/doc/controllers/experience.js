const withoutParameters = {
  get: {
    tags: ["Experience"],
    description: "",
    parameters: [],
    responses: {
      200: {
        description: "Successful.",
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
        description: "Unsuccessful.",
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
                  type: "string",
                  example: [
                    "5f28ac7082e88b35448255e8",
                    "5f28ba7011e35b35448255e8",
                  ],
                },
              },

              work: {
                type: "array",
                items: {
                  type: "string",
                  example: [
                    "3a28ac7082e88b35448255e8",
                    "3a36ty9019e36g1356785e8",
                  ],
                },
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/experience",
            },
          },
        },
      },

      400: {
        description: "Unsuccessful.",
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
  get: {
    tags: ["Experience"],
    description: "",
    parameters: [
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

    responses: {
      200: {
        description: "Successful.",
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
        description: "Unsuccessful.",
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
        description: "Successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/experience",
            },
          },
        },
      },

      400: {
        description: "Unsuccessful.",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "This experience cannot be updated.",
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
        name: "id",
        schema: {
          type: "string",
          example: "5f28ac7082e88b35448255e8",
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: "Successful.",
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
        description: "Unsuccessful.",
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
