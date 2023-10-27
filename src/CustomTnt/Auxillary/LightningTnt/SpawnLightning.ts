import {
  MCFunction,
  Selector,
  execute,
  kill,
  rel,
  spreadplayers,
  summon,
} from "sandstone";
import { self } from "../../../Tick";

const spawnLightning = MCFunction(
  "custom_tnt/auxillary/spawn_lightning",
  () => {
    // ASAT marker and summon the bolt marker and randomly spread it
    execute
      .at(Selector("@e", { type: "minecraft:marker", tag: "lightning.marker" }))
      .run(() => {
        summon("minecraft:marker", rel(0, 0, 0), {
          Tags: ["lightning.bolt_marker"],
        });
        spreadplayers(
          rel(0, 0),
          5,
          20,
          false,
          Selector("@e", {
            type: "minecraft:marker",
            tag: "lightning.bolt_marker",
          })
        );
      });

    // ASAT bolt marker and summon the lightning bolt
    execute
      .as(
        Selector("@e", {
          type: "minecraft:marker",
          tag: "lightning.bolt_marker",
        })
      )
      .at(self)
      .run(() => {
        summon("minecraft:lightning_bolt");
        kill(self);
      });
  },
  {
    runEach: "10t",
  }
);
