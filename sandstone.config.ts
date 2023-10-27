import type { SandstoneConfig } from "sandstone";

export default {
  name: "CustomTNT2",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 15,
  namespace: "custom_tnt_2",
  packUid: "RtkOzjBi",
  // saveOptions: { path: './.sandstone/output/datapack' },
  saveOptions: { world: "Testing 4" },
  onConflict: {
    default: "warn",
  },
} as SandstoneConfig;
