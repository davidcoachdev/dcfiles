// Track active skills in the TUI
// Shows which skills are loaded and by which agent
export const SkillTracker = async ({ client, $ }) => {
  const activeSkills = new Map(); // skillName -> { agent, timestamp }

  return {
    // Intercept skill tool calls
    "tool.execute.before": async (input, output) => {
      if (input.tool === "skill") {
        const skillName = input.args?.name || "unknown";
        const agent = input.agent || "main";
        activeSkills.set(skillName, { agent, at: new Date().toLocaleTimeString() });
        
        // Log to client
        await client?.app?.log?.({
          body: {
            service: "skill-tracker",
            level: "info",
            message: `Skill loaded: ${skillName} by ${agent}`,
          },
        });
      }
    },

    // Expose skills list via tool for the agent to call
    tool: {
      skills_active: {
        description: "Show all currently active loaded skills",
        async execute() {
          if (activeSkills.size === 0) {
            return "No skills loaded yet this session.";
          }
          let out = "**Active Skills:**\n";
          for (const [name, info] of activeSkills) {
            out += `- \`${name}\` → loaded by \`${info.agent}\` at ${info.at}\n`;
          }
          out += `\nTotal: ${activeSkills.size} skill(s) active.`;
          return out;
        },
      },
    },
  };
};
