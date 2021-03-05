const addPassword = (object) => {
  object.properties.password = {
    type: "string",
    example: "M33sc0lh3",
  };
  return object;
};

const removeId = (object) => {
  for (prop in object) {
    if (prop === "id") delete object[prop];
    else if (typeof object[prop] === "object") removeId(object[prop]);
  }
  return object;
};

const addSelections = (object) => {
  object.properties.selections = {
    type: "array",
    items: {
      type: "object",
      required: ["id", "academic", "work"],
      properties: {
        id: {
          type: "string",
          example: "8y3d1fa6dccfa335d03fdd3e",
        },

        role: {
          type: "string",
          example: "Frontend developer",
        },

        description: {
          type: "string",
          example: "Desejável ter conhecimento em Angular",
        },

        phases: {
          type: "array",
          items: {
            type: "string",
            examples: "5f28ba7011e35b35448255e8",
          },
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
  };
  return object;
};

module.exports = {
  addPassword,
  addSelections,
  removeId,
};
