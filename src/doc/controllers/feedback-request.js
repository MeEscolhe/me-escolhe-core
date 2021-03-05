const withoutParameters = {
  get: {
    tags: ["Feedback Request"],
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
                $ref: "#/components/schemas/feedbackRequest",
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
              example: "No feedback requests to show.",
              enum: ["No feedback requests to show."],
            },
          },
        },
      },
    },
  },

  post: {
    tags: ["Feedback Request"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              studentId: {
                type: "number",
                example: 116210877,
              },

              phaseId: {
                type: "string",
                example: "5t5d1fb8dccfa665d03fdd3e",
              },

              teacherId: {
                type: "string",
                example: "5t5d1fa6dccfa665d03fdd3e",
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
              $ref: "#/components/schemas/feedbackRequest",
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
              example: "This feedback request cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  get: {
    tags: ["Feedback Request"],
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
              $ref: "#/components/schemas/feedbackRequest",
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
              example: "The feedback request with the given id was not found.",
            },
          },
        },
      },
    },
  },

  put: {
    tags: ["Feedback Request"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of feedback request",
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
              "studentId: ": 116210877,
              "phaseId: ": "5t5d1fb8dccfa665d03fdd3e",
              "teacherId: ": "5t5d1fa6dccfa665d03fdd3e",
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
              $ref: "#/components/schemas/feedbackRequest",
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
              example: "This feedback request cannot be updated.",
            },
          },
        },
      },
    },
  },

  delete: {
    tags: ["Feedback Request"],
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
              $ref: "#/components/schemas/feedbackRequest",
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
              example: "The feedback request with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters };
