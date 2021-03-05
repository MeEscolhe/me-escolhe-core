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
                $ref: "#/components/responses/studentWithSelections",
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
            $ref: "#/components/requests/studentWithPassword",
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
              type: "object",
              properties: {
                user: {
                  type: "object",
                  $ref: "#/components/responses/studentWithSelections",
                },
                token: {
                  type: "String",
                  example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcm1lbGl0YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImRlbGFtYW5jaGEiLCJpYXQiOjE2MTQ4ODY4MzQsImV4cCI6MTYxNTQ5MTYzNH0.X1a7IUxEaC9HNMwjb9XDcKmj7ylVNHiuE3P4jZ4slIM",
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
        name: "registration",
        schema: {
          type: "string",
          example: "116133454",
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
              $ref: "#/components/responses/studentWithSelections",
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
              example: "The student with the given registration was not found.",
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
        in: "path",
        name: "registration",
        schema: {
          type: "string",
          example: "116133454",
        },
        required: true,
      },
      ,
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
              example: "This student cannot be updated.",
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
        name: "registration",
        schema: {
          type: "string",
          example: "116133454",
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
              example: "The student with the given registration was not found.",
            },
          },
        },
      },
    },
  },
};

const login = {
  get: {
    tags: ["Student"],
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
                example: "thomas.lopes@ccc.ufcg.edu.br",
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
              example: "The student with the given email was not found.",
            },
          },
        },
      },
    },
  },
};

const seeStudentInSelection = {
  get: {
    tags: ["Student"],
    description: "",
    parameters: [
      {
        in: "path",
        name: "registration",
        schema: {
          type: "string",
          example: "116133454",
        },
        required: true,
      },
      {
        in: "path",
        name: "selectionId ",
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
              type: "boolean",
              example: true,
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
              example: "The student with the given registration was not found.",
            },
          },
        },
      },
    },
  },
};
module.exports = {
  withParameters,
  withoutParameters,
  login,
  seeStudentInSelection,
};
