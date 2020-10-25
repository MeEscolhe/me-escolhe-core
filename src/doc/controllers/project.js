const withoutParameters = {
  get: {
    tags: ["Project"],
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
                $ref: "#/components/schemas/project",
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
              example: "No projects to show.",
              enum: ["No projects to show."],
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Project"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "PIBIC",
              },

              description: {
                type: "string",
                example: "Projeto de iniciação científica",
              },
              selections: {
                type: "array",
                items: {
                  type: "string",
                  example: [
                    "5f28ac7082e88b35448255e8",
                    "5f28ba7011e35b35448255e8",
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
              $ref: "#/components/schemas/project",
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
              example: "This project cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  get: {
    tags: ["Project"],
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
        description: "GET: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/project",
            },
          },
          required: true,
        },
      },

      404: {
        description: "GET: unsuccessful",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "The project with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Project"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of project",
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
            $ref: "#/components/schemas/project",
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
              $ref: "#/components/schemas/project",
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
              example: "This project cannot be updated.",
            },
          },
        },
      },
    },
  },

  delete: {
    tags: ["Project"],
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
        description: "DELETE: successful.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/project",
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
              example: "The project with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters };
