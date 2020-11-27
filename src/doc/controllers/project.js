const projectWithLab = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "5f5d1fa6dccfa335d03fdd3e",
    },
    name: {
      type: "string",
      example: "PIBIC",
    },
    name: {
      type: "string",
      example: "PIBIC",
    },
    description: {
      type: "string",
      example: "Academic Project",
    },
    lab: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "IQuanta",
        },
        description: {
          type: "string",
          example: "Laboratório de computação quântica",
        },
      },
    },
    selections: {
      type: "array",
      example: ["5f28ac7082e88b35448255e8", "5f28ba7011e35b35448255e9"],
    },
  },
};

const requestBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "PIBIC",
    },
    description: {
      type: "string",
      example: "Academic Project",
    },
    labId: {
      type: "string",
      example: "Laboratório de computação quântica",
    },
    selections: {
      type: "array",
      example: ["5f28ac7082e88b35448255e8", "5f28ba7011e35b35448255e8"],
    },
  },
};

const withoutParameters = {
  get: {
    tags: ["Project"],
    description: "",
    parameters: [],
    responses: {
      200: {
        description: "Successful.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: projectWithLab,
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
          schema: requestBody,
        },
      },
    },

    responses: {
      200: {
        description: "Successful.",
        content: {
          "application/json": {
            schema: projectWithLab,
          },
        },
      },

      400: {
        description: "Unsuccessful.",
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
        description: "Successful.",
        content: {
          "application/json": {
            schema: projectWithLab,
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
          example: "5f5d1fa6dccfa335d03fdd3e",
        },
      },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: requestBody,
        },
      },
    },

    responses: {
      200: {
        description: "Successful.",
        content: {
          "application/json": {
            schema: projectWithLab,
          },
        },
      },

      400: {
        description: "Unsuccessful.",
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
        description: "Successful.",
        content: {
          "application/json": {
            schema: projectWithLab,
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
              example: "The project with the given id was not found.",
            },
          },
        },
      },
    },
  },
};

const teacher = {
  get: {
    tags: ["Project"],
    description: "",
    parameters: [
      {
        in: "path",
        name: "teacherId",
        schema: {
          type: "string",
          example: "5f5d1fa6dccfa335d03fdabc",
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
              type: "array",
              items: projectWithLab,
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
              example: "No projects to show.",
              enum: ["No projects to show."],
            },
          },
        },
      },
    },
  },
};

module.exports = { withParameters, withoutParameters, teacher };
