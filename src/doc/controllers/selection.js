const withoutParameters = {
  get: {
    tags: ["Selection"],
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
                $ref: "#/components/schemas/selection",
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
              example: "No selections to show.",
              enum: ["No selections to show."],
            },
          },
        },
      },
    },
  },

  post: {
    tags: ["Selection"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              role: {
                type: "string",
                example: "Frontend developer",
              },

              description: {
                type: "string",
                example: "Desejável ter conhecimento em Angular",
              },

              current: {
                type: "boolean",
                example: true,
              },

              skills: {
                type: "object",
                properties: {
                  hardSkills: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          example: "Java",
                        },
                        level: {
                          type: "number",
                          example: 2,
                          enum: [0, 1, 2, 3, 4],
                        },
                      },
                    },
                  },
                  softSkills: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          example: "Trabalha bem em grupo",
                        },
                      },
                    },
                  },
                  languages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          example: "Java",
                        },
                        level: {
                          type: "number",
                          example: 2,
                          enum: [0, 1, 2],
                        },
                      },
                    },
                  },
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
              $ref: "#/components/schemas/selection",
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
              example: "This selection cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  get: {
    tags: ["Selection"],
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
              $ref: "#/components/schemas/selection",
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
              example: "The selection with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Selection"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of selection",
        required: true,
        schema: {
          type: "string",
          example: "8y3d1fa6dccfa335d03fdd3e",
        },
      },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              role: "Frontend developer",
              description: "Desejável ter conhecimento em Angular",
              "phases: ": ["string"],
              current: true,
              skills: {
                hardSkills: [
                  {
                    name: "Java",
                    level: 2,
                  },
                ],
                softSkills: [
                  {
                    name: "Trabalha bem em grupo",
                  },
                ],
                languages: [
                  {
                    name: "Java",
                    level: 2,
                  },
                ],
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
              $ref: "#/components/schemas/selection",
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
              example: "This selection cannot be updated.",
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Selection"],
    description: "",
    parameters: [
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
          example: "8y3d1fa6dccfa335d03fdd3e",
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
              $ref: "#/components/schemas/selection",
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
              example: "The selection with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters };
