import {
  MCFunction,
  NBT,
  Selector,
  execute,
  fill,
  kill,
  particle,
  raw,
  rel,
  schedule,
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
      placeAndCreateFunction("give_snow", "Snow TNT", "snow", 120002);
      placeAndCreateFunction("give_water", "Water TNT", "water", 120003);
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
      explosionHandler(
        "tnt.snow",
        100,
        () => {
          particle(
            "minecraft:snowflake",
            rel(0, 0.8, 0),
            [0.1, 0.5, 0.1],
            0.1,
            5,
            "force"
          );
          particle(
            "minecraft:block",
            "minecraft:blue_ice",
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            0,
            4,
            "force"
          );
        },
        () => {
          // Square
          // for (let i = -6; i <= 6; i += 1) {
          //   for (let j = -6; j <= 6; j += 1) {
          //     fill(
          //       rel(i, 0, j),
          //       rel(i, -4, j),
          //       `minecraft:powder_snow replace #aestd1:all_but_air`
          //     );
          //   }
          // }

          // Circle
          for (let i = 1; i <= 8; i += 1) {
            for (let j = 0; j <= 50; j += 1) {
              // setblock(
              //   rel(
              //     Math.round(Math.sin(j) * i),
              //     0,
              //     Math.round(Math.cos(j) * i)
              //   ),
              //   `minecraft:snow[layers=${randomIntFromInterval(1, 5)}]`
              // );
              fill(
                rel(
                  Math.round(Math.sin(j) * i),
                  0,
                  Math.round(Math.cos(j) * i)
                ),
                rel(
                  Math.round(Math.sin(j) * i),
                  -4,
                  Math.round(Math.cos(j) * i)
                ),
                `minecraft:powder_snow replace #aestd1:all_but_air`
              );
            }
          }
          particle(
            "minecraft:snowflake",
            rel(0, 0.5, 0),
            [8, 8, 8],
            0.1,
            5000,
            "force"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.water",
        100,
        () => {
          particle(
            "minecraft:splash",
            rel(0, 0.8, 0),
            [0.1, 0.5, 0.1],
            0.1,
            25,
            "force"
          );
          particle(
            "minecraft:falling_water",
            rel(0, 0.8, 0),
            [0.5, 0.2, 0.5],
            0.1,
            10,
            "force"
          );
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(4),
          });
          summon("minecraft:marker", rel(0, 0, 0), {
            Tags: ["water_hole_marker"],
          });

          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:marker",
                    tag: "water_hole_marker",
                  })
                )
                .at(self)
                .run(() => {
                  fill(
                    rel(6, -1, 6),
                    rel(-6, -6, -6),
                    "minecraft:water replace minecraft:air"
                  );
                  particle(
                    "minecraft:splash",
                    rel(0, 0.8, 0),
                    [2, 0.1, 2],
                    0.1,
                    60,
                    "force"
                  );
                  kill(self);
                });
            },
            "5t",
            "append"
          );
        },
        null,
        null
      );
    });
});
