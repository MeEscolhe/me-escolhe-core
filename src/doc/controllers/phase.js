const thomas = {
  registration: 116210887,
  name: "Thomas",
  email: "thomas.lopes@ccc.ufcg.edu.br",
  password: "thomas.lopes123",
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
  experiences: ["5f28ac7082e88b35448255e8", "5f28ba7011e35b35448255e8"],
  phases: ["7f78fr3111x97h53779000a1", "7a65hg8755k73s21116789i8"],
};

const jessica = {
  registration: 112130765,
  name: "Jessica",
  email: "jessica.lopes@ccc.ufcg.edu.br",
  password: "jessica.lopes123",
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
  experiences: ["5f28ac7082e88b35448255e8", "5f28ba7011e35b35448255e8"],
  phases: ["7f78fr3111x97h53779000a1", "7a65hg8755k73s21116789i8"],
};

const phaseWithStudents = {
  type: "object",
  example: {
    students: [thomas, jessica],
    id: "5f28ac7082e88b35448255e8",
    selectionId: "5f28ac7082e88b35448255e8",
    description: "Fase de seleção de currículo",
  },
};

const phaseWithStudent = {
  type: "object",
  example: {
    students: [thomas],
    id: "5f28ac7082e88b35448255e8",
    selectionId: "5f28ac7082e88b35448255e8",
    description: "Fase de seleção de currículo",
  },
};

const phaseWithoutStudent = {
  type: "object",
  example: {
    students: [],
    id: "5f28ac7082e88b35448255e8",
    selectionId: "5f28ac7082e88b35448255e8",
    description: "Fase de seleção de currículo",
  },
};

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
              items: phaseWithStudents,
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
            schema: phaseWithStudents,
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
            schema: phaseWithStudents,
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
            schema: phaseWithStudents,
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
            schema: phaseWithStudents,
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
          example: "116210887",
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: "Successful",
        content: {
          "application/json": {
            schema: phaseWithStudent,
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
          example: "116210887",
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: "Successful",
        content: {
          "application/json": {
            schema: phaseWithoutStudent,
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
