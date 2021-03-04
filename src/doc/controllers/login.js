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

const loggedUser = {
  user: student,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcm1lbGl0YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImRlbGFtYW5jaGEiLCJpYXQiOjE2MTQ4ODY4MzQsImV4cCI6MTYxNTQ5MTYzNH0.X1a7IUxEaC9HNMwjb9XDcKmj7ylVNHiuE3P4jZ4slIM",
};

const loginForm = {
  email: "thomas.lopes@ccc.ufcg.edu.br",
  password: "thomas123",
};

const withoutParameters = {
  get: {
    tags: ["Auth"],
    description: "",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            example: loginForm,
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
              example: loggedUser,
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

module.exports = {
  withoutParameters,
};
