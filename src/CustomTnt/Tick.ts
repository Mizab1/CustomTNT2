import {
  MCFunction,
  NBT,
  Selector,
  execute,
  particle,
  raw,
  rel,
  summon,
} from "sandstone";
import { self } from "../Tick";
import {
  explosionHandler,
  placeAndCreateFunction,
} from "./private/SetupGenerics";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed
      placeAndCreateFunction(
        "give_meteorite",
        "Meteorite TNT",
        "meteor",
        120001
      );
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler
      explosionHandler(
        "tnt.meteor",
        100,
        () => {
          for (let i = 0; i < 40; i++) {
            particle(
              "minecraft:falling_dust",
              "minecraft:red_concrete",
              rel(Math.sin(i) * 2, 1, Math.cos(i) * 2),
              [0, 0, 0],
              0,
              1,
              "force"
            );
          }
          particle(
            "minecraft:ash",
            rel(0, 0.8, 0),
            [0.1, 0.5, 0.1],
            0.1,
            50,
            "force"
          );
        },
        () => {
          raw(
            `summon fireball ~ ~100 ~ {ExplosionPower:6b,power:[0.0,-0.3,0.0],Item:{id:"minecraft:wooden_hoe",Count:1b,tag:{CustomModelData:100001}}}`
          );
        },
        null,
        null
      );
    });
});
