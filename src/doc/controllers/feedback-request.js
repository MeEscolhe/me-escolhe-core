const withoutParameters = {
  get: {
    tags: ["Feedback Request"],
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
                $ref: "#/components/schemas/feedback-request",
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
              example: "No feedback requests to show.",
              enum: ["No feedback requests to show."],
            },
          },
        },
      },
    },
  },
  post: {
    tags: ["Feedback request"],
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

              "phaseId: ": {
                type: "objectId",
              },

              "teacherId: ": {
                type: "objectId",
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
              $ref: "#/components/schemas/feedback-request",
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
              example: "This feedback request cannot be created.",
            },
          },
        },
      },
    },
  },
};

const withParameters = {
  put: {
    tags: ["Feedback request"],
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of feedback-request",
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
            $ref: "#/components/schemas/feedback-request",
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
              $ref: "#/components/schemas/feedback-request",
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
              example: "This feedback request cannot be created.",
            },
          },
        },
      },
    },
  },
  delete: {
    tags: ["Feedback request"],
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
              $ref: "#/components/schemas/feedback-request",
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
              example: "The feedback request with the given id was not found.",
            },
          },
        },
      },
    },
  },
};
module.exports = { withParameters, withoutParameters };
