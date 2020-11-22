const withoutParameters = {
  get: {
    tags: ["Teacher"],
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
                $ref: "#/components/schemas/teacher",
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
              example: "No teachers to show.",
              enum: ["No teachers to show."],
            },
          },
        },
      },
    },
  },

  post: {
    tags: ["Teacher"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "String",
                example: "Jonas",
              },

              email: {
                type: "String",
                example: "jonas.alcantara@ccc.ufcg.edu.br",
              },

              password: {
                type: "string",
                example: "jonas.alcantara123",
              },

              description: {
                type: "String",
                example: "Professor adjunto",
              },

              labId: {
                type: "string",
                examples: "6t71fk9127g63j85493265w2",
              },

              managements: {
                type: "array",
                items: {
                  type: "string",
                  examples: [
                    "4a14bg8357c32u09875565b7",
                    "6u74zb0034f65zu435743o0",
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
              $ref: "#/components/schemas/teacher",
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
              example: "This teacher cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  get: {
    tags: ["Teacher"],
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
              $ref: "#/components/schemas/teacher",
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
              example: "The teacher with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Teacher"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of teacher",
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
            $ref: "#/components/schemas/teacher",
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
              $ref: "#/components/schemas/teacher",
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
              example: "This teacher cannot be updated.",
            },
          },
        },
      },
    },
  },

  delete: {
    tags: ["Teacher"],
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
              $ref: "#/components/schemas/teacher",
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
              example: "The teacher with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

const login = {
  get: {
    tags: ["Teacher"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "String",
                example: "jonas.alcantara@ccc.ufcg.edu.br",
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
              $ref: "#/components/schemas/teacher",
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
              example: "The teacher with the given email was not found.",
            },
          },
        },
      },
    },
  },
};

const selections = {
  get: {
    tags: ["Teacher"],
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
              type: "array",
              items: {
                $ref: "#/components/schemas/teacher".managements,
              },
            }
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
              example: "The phase with the given id was not found.",
            },
          },
        },
      },
    },
  }
};

module.exports = { withParameters, withoutParameters, login, selections };
