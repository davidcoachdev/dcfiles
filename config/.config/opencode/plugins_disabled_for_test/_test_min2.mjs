export default async function t({ client, directory }) {
  return {
    tool: {
      dc_dev_superflow_dispatch: {
        description: "min args empty no sdk",
        args: {},
        execute: async (args, context) => ({ output: "min ok" }),
      },
    },
  }
}