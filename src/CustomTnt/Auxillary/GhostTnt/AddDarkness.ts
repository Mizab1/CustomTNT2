import { MCFunction, Selector, effect, execute } from "sandstone";
import { self } from "../../../Tick";

export const AddDarkness = MCFunction(
  "custom_tnt/auxillary/ghost_tnt/add_darkness",
  () => {
    // Give darkness to the nearby player
    execute
      .as(
        Selector("@e", {
          type: "minecraft:block_display",
          tag: "ghost_block_display",
        })
      )
      .at(self)
      .run(() => {
        effect.give(
          Selector("@a", { distance: [Infinity, 5] }),
          "minecraft:darkness",
          5,
          1,
          true
        );
      });
  }
);
