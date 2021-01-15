const withoutParameters = {
  get: {
    tags: ["Selection"],
    description: "",
    parameters: [
      {
        in: "path",
        name: "type",
        schema: {
          type: "string",
          example: "student",
          enum: ["all", "student", "teacher"],
        },
        required: true,
      },
      {
        in: "path",
        name: "id",
        schema: {
          type: "string",
          example: "5f5d1fa6dccfa335d03fdd3e",
        },
        description:
          "teacher => mongodb Id, student => registration, all id can be undefined",
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
              items: {
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
                  phases: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/phase",
                    },
                  },
                  project: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "5f5d1fa6dccfa335d03fdd33",
                      },

                      name: {
                        type: "string",
                        example: "PIBIC",
                      },

                      description: {
                        type: "string",
                        example: "Projeto de iniciação científica",
                      },

                      lab: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "5f5d1fa6dccfa335d03fddaa",
                          },

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
                        example: [
                          "5f28ac7082e88b35448255e8",
                          "5f28ba7011e35b35448255e8",
                        ],
                      },
                    },
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
            example: {
              role: "Frontend developer",
              description: "Desejável ter conhecimento em Angular",
              current: true,
              project: {
                id: "5f5d1fa6dccfa335d03fdd33",
                name: "PIBIC",
                description: "Projeto de iniciação científica",
                lab: {
                  id: "5f5d1fa6dccfa335d03fddaa",
                  name: "IQuanta",
                  description: "Laboratório de computação quântica",
                },
                selections: [
                  "5f28ac7082e88b35448255e8",
                  "5f28ba7011e35b35448255e8",
                ],
              },
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
            type: "object",
            example: {
              role: "Frontend developer",
              description: "Desejável ter conhecimento em Angular",
              current: true,
              phases: [
                {
                  registration: 116133454,
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
                  experiences: [
                    {
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
                    },
                  ],
                  phases: [
                    "7f78fr3111097h53779000a1",
                    "7a65hg8755k73s21116789i8",
                  ],
                },
              ],
              project: {
                id: "5f5d1fa6dccfa335d03fdd33",
                name: "PIBIC",
                description: "Projeto de iniciação científica",
                lab: {
                  id: "5f5d1fa6dccfa335d03fddaa",
                  name: "IQuanta",
                  description: "Laboratório de computação quântica",
                },
                selections: [
                  "5f28ac7082e88b35448255e8",
                  "5f28ba7011e35b35448255e8",
                ],
              },
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
            example: {
              role: "Frontend developer",
              description: "Desejável ter conhecimento em Angular",
              current: true,
              project: {
                id: "5f5d1fa6dccfa335d03fdd33",
                name: "PIBIC",
                description: "Projeto de iniciação científica",
                lab: {
                  id: "5f5d1fa6dccfa335d03fddaa",
                  name: "IQuanta",
                  description: "Laboratório de computação quântica",
                },
                selections: [
                  "5f28ac7082e88b35448255e8",
                  "5f28ba7011e35b35448255e8",
                ],
              },
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
            example: {
              role: "Frontend developer",
              description: "Desejável ter conhecimento em Angular",
              current: true,
              project: {
                id: "5f5d1fa6dccfa335d03fdd33",
                name: "PIBIC",
                description: "Projeto de iniciação científica",
                lab: {
                  id: "5f5d1fa6dccfa335d03fddaa",
                  name: "IQuanta",
                  description: "Laboratório de computação quântica",
                },
                selections: [
                  "5f28ac7082e88b35448255e8",
                  "5f28ba7011e35b35448255e8",
                ],
              },
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
