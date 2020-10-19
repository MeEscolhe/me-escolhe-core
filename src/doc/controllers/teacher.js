const withoutParameters = {
  get: {
    tags: ["Teacher"],
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
                $ref: "#/components/schemas/teacher",
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
        description: "POST: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/teacher",
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
              example: "This teacher cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
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
        description: "PUT: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/teacher",
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
              example: "This teacher cannot be updatedted.",
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
              $ref: "#/components/schemas/teacher",
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
              example: "The teacher with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters };
