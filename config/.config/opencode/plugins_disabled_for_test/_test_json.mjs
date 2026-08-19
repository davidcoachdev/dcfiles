export default async function t({ client, directory }) {
  return {
    tool: {
      dc_dev_superflow_dispatch: {
        description: "JSON-schema args test. Provide target (string) and prompt (string).",
        args: {
          target: { type: "string", description: "child agent name" },
          prompt: { type: "string", description: "prompt to run" },
        },
        execute: async (args, context) => ({ output: JSON.stringify({ received: args }) }),
      },
    },
  }
}
