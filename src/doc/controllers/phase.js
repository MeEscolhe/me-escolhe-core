const withoutParameters = {
  get: {
    tags: ["Phase"],
    description: "",
    parameters: [],
    responses: {
      200: {
        description: "Successful",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/phase",
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
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              students: {
                type: "array",
                example: [116210887, 112130765],
              },

              selectionId: {
                type: "string",
                example: "5f28ac7082e88b35448255e8",
              },

              description: {
                type: "string",
                example: "Fase de seleção de currículo",
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
              $ref: "#/components/schemas/phase",
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
              example: "This phase cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  get: {
    tags: ["Phase"],
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
              $ref: "#/components/schemas/phase",
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
              example: "The phase with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Phase"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of phase",
        required: true,
        schema: {
          type: "string",
          example: "5f5d1fa6dccfa335d03fdd3e",
        },
      },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "students: ": [116210887, 112130765],
              "selectionId: ": "5f28ac7082e88b35448255e8",
              "description: ": "Fase de seleção de currículo",
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
              $ref: "#/components/schemas/phase",
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
              example: "This phase cannot be updated.",
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Phase"],
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
              $ref: "#/components/schemas/phase",
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
              example: "The phase with the given id was not found.",
            },
          },
        },
      },
    },
  },
};
const StudentRoute = {
  post: {
    tags: ["Phase"],
    description: "Add student in phase",
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
      {
        in: "path",
        name: "registration",
        schema: {
          type: "string",
          example: "1234567890",
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: "Successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "5f5d1fa6dccfa335d03fdd3e",
                },

                "students: ": {
                  type: "array",
                  items: {
                    type: "number",
                    example: [1234567890],
                  },
                },

                "selectionId: ": {
                  type: "string",
                  example: "5f5d1fa6dccfa335d03fdd3e",
                },

                "description: ": {
                  type: "string",
                  example: "Fase de seleção de currículo",
                },
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
              example: "Phase and student not found",
              enum: [
                "Phase and student not found",
                "Phase not found",
                "Student not found",
                "Student already registered in the phase",
              ],
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Phase"],
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
      {
        in: "path",
        name: "registration",
        schema: {
          type: "string",
          example: "1234567890",
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: "Successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "5f5d1fa6dccfa335d03fdd3e",
                },

                "students: ": {
                  type: "array",
                  items: {
                    type: "number",
                    example: [],
                  },
                },

                "selectionId: ": {
                  type: "string",
                  example: "5f5d1fa6dccfa335d03fdd3e",
                },

                "description: ": {
                  type: "string",
                  example: "Fase de seleção de currículo",
                },
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
              example: "Phase and student not found",
              enum: [
                "Phase and student not found",
                "Phase not found",
                "Student not found",
                "Student already registered in the phase",
              ],
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters, StudentRoute };
