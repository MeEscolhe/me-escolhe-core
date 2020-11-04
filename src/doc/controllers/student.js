const withoutParameters = {
  get: {
    tags: ["Student"],
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
                $ref: "#/components/schemas/student",
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
              example: "No students to show.",
              enum: ["No students to show."],
            },
          },
        },
      },
    },
  },

  post: {
    tags: ["Student"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              registration: {
                type: "number",
                example: 116133454,
              },

              name: {
                type: "String",
                example: "Thomas",
              },

              email: {
                type: "String",
                example: "thomas.lopes@ccc.ufcg.edu.br",
              },

              cra: {
                type: "number",
                example: 8.5,
              },

              description: {
                type: "String",
                example: "Developer",
              },

              skills: {
                type: "array",
                items: {
                  type: "string",
                  examples: [
                    "4a14bg8357c32u09875565b7",
                    "6u74zb0034f65zu435743o0",
                  ],
                },
              },

              experiences: {
                type: "array",
                items: {
                  type: "string",
                  examples: [
                    "5f28ac7082e88b35448255e8",
                    "5f28ba7011e35b35448255e8",
                  ],
                },
              },

              phases: {
                type: "array",
                items: {
                  type: "string",
                  examples: [
                    "7f78fr3111x97h53779000a1",
                    "7a65hg8755k73s21116789i8",
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
              $ref: "#/components/schemas/student",
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
              example: "This student cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  get: {
    tags: ["Student"],
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
              $ref: "#/components/schemas/student",
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
              example: "The student with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Student"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of student",
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
            $ref: "#/components/schemas/student",
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
              $ref: "#/components/schemas/student",
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
              example: "This student cannot be updatedted.",
            },
          },
        },
      },
    },
  },

  delete: {
    tags: ["Student"],
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
              $ref: "#/components/schemas/student",
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
              example: "The student with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters };
