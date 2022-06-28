const createSchema = {
  type: "object",
  properties: {
    layout: {
      type: "array",
      minItems: 1,
      items: {
        type: "array",
        minItems: 1,
        items: {
          type: "string",
        },
      },
    },
  },
  required: ["layout"],
};

export { createSchema };
