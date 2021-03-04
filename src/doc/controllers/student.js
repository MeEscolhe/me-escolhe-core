const experience = {
  type: "object",
  properties: {
    academic: {
      type: "array",
      example: [
        {
          id: "5f5d1fa6dccfa335d03fdd31",
          title: "Developer",
          category: "Backend",
          institution: "UFCG",
          initialDate: "2018-08-22",
          finalDate: "2019-10-23",
        },
        {
          id: "5f5d1fa6dccfa335d03fdd32",
          title: "Developer",
          category: "Frontend",
          institution: "UFCG",
          initialDate: "2018-08-22",
          finalDate: "2019-10-23",
        },
      ],
    },
    work: {
      type: "array",
      example: [
        {
          id: "5f5d1fa6dccfa335d03fdd3e",
          role: "Developer",
          institution: "Microsoft",
          initialDate: "2018-08-22",
          finalDate: "2019-10-23",
        },
        {
          id: "5f5d1fa6dccfa335d03fdd3e",
          role: "Developer",
          institution: "Google",
          initialDate: "2018-08-22",
          finalDate: "2019-10-23",
        },
      ],
    },
  },
};

const student = {
  registration: 116133454,
  name: "Thomas",
  email: "thomas.lopes@ccc.ufcg.edu.br",
  cra: 8.5,
  description: "Developer",
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
  experiences: [experience],
  phases: ["7f78fr3111097h53779000a1", "7a65hg8755k73s21116789i8"],
};

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
              example: [student],
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

              password: {
                type: "string",
                example: "thomas.lopes123",
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

              experiences: {
                type: "array",
                example: [
                  "5f28ac7082e88b35448255e8",
                  "5f28ba7011e35b35448255e8",
                ],
              },

              phases: {
                type: "array",
                example: [
                  "7f78fr3111x97h53779000a1",
                  "7a65hg8755k73s21116789i8",
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
              example: student,
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
              example: student,
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
