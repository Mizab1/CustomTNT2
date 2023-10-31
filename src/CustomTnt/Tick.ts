import {
  MCFunction,
  MCFunctionInstance,
  NBT,
  Selector,
  execute,
  fill,
  kill,
  particle,
  playsound,
  raw,
  rel,
  schedule,
  setblock,
  spreadplayers,
  summon,
  tp,
} from "sandstone";
import { self } from "../Tick";
import {
  explosionHandler,
  placeAndCreateFunction,
} from "./private/SetupGenerics";
import { randomIntFromInterval } from "../Utils/Functions";
import { tpAhead } from "./Auxillary/InvertedTnt/TpAhead";

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
      placeAndCreateFunction("give_ice", "Ice TNT", "ice", 120004);
      placeAndCreateFunction("give_arrow", "Arrow TNT", "arrow", 120005);
      placeAndCreateFunction("give_volcano", "Volcano TNT", "volcano", 120006);
      placeAndCreateFunction("give_gravity", "Gravity TNT", "gravity", 120007);
      placeAndCreateFunction("give_ghost", "Ghost TNT", "ghost", 120008);
      placeAndCreateFunction("give_ender", "Ender TNT", "ender", 120009);
      placeAndCreateFunction(
        "give_inverted",
        "Inverted TNT",
        "inverted",
        120010
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
            CustomName: '{"text":"TNT","italic":false}',
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
      explosionHandler(
        "tnt.ice",
        100,
        () => {
          particle(
            "minecraft:block",
            "minecraft:blue_ice",
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            0,
            4,
            "force"
          );
          particle(
            "minecraft:block",
            "minecraft:ice",
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            0,
            4,
            "force"
          );
        },
        () => {
          // Circle Generation
          let ice: Array<string> = ["minecraft:ice", "minecraft:blue_ice"];

          for (let i = 1; i <= 8; i += 1) {
            for (let j = 0; j <= 50; j += 1) {
              setblock(
                rel(
                  Math.round(Math.sin(j) * i),
                  -1,
                  Math.round(Math.cos(j) * i)
                ),
                `${ice[Math.floor(Math.random() * ice.length)]}`
              );
            }
          }
          particle(
            "minecraft:block",
            "minecraft:ice",
            rel(0, 0.5, 0),
            [6, 0, 6],
            0.1,
            500,
            "force"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.arrow",
        100,
        () => {
          particle(
            "minecraft:crit",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:item",
            "minecraft:arrow",
            rel(0, 1.3, 0),
            [0, 0.3, 0],
            0,
            4,
            "force"
          );
        },
        () => {
          // Square Generation
          for (let i = -10; i <= 10; i += 1) {
            for (let j = -10; j <= 10; j += 1) {
              summon(
                "minecraft:arrow",
                rel(i, randomIntFromInterval(30, 40), j)
              );
              summon(
                "minecraft:arrow",
                rel(i, randomIntFromInterval(60, 70), j),
                {
                  Potion: "minecraft:poison",
                }
              );
            }
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.volcano",
        100,
        () => {
          particle(
            "minecraft:block",
            "minecraft:magma_block",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:flame",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          // Circle Generation
          let volcanicBlocks: Array<string> = [
            "minecraft:magma_block",
            "minecraft:netherrack",
          ];

          for (let i = -10; i <= 10; i += 1) {
            for (let j = -10; j <= 10; j += 1) {
              fill(
                rel(i, -1, j),
                rel(i, -6, j),
                `${
                  volcanicBlocks[
                    Math.floor(Math.random() * volcanicBlocks.length)
                  ]
                } replace #aestd1:all_but_air`
              );
            }
          }

          for (let i = 0; i <= 10; i += 1) {
            // summon("minecraft:tnt", rel(Math.sin(i), 0.5, Math.cos(i)), {
            //   Fuse: 40,
            // });
            summon("minecraft:tnt", rel(Math.sin(i), 0.2, Math.cos(i)), {
              Fuse: 20,
            });
            summon("minecraft:tnt", rel(Math.sin(i), 0.8, Math.cos(i)), {
              Fuse: 20,
            });
          }

          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(3),
            CustomName: '{"text":"TNT","italic":false}',
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.gravity",
        100,
        () => {
          particle(
            "minecraft:portal",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:reverse_portal",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          spreadplayers(
            rel(0, 0),
            2,
            6,
            false,
            Selector("@e", {
              type: "#aestd1:living_base",
              distance: [Infinity, 50],
              limit: 15,
              sort: "nearest",
            })
          );
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 1,
            ignited: NBT.byte(1),
            ExplosionRadius: NBT.byte(10),
            CustomName: '{"text":"TNT","italic":false}',
          });
          particle(
            "minecraft:portal",
            rel(0, 0.8, 0),
            [3, 3, 3],
            0,
            2000,
            "force"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ghost",
        100,
        () => {
          particle(
            "minecraft:block",
            "minecraft:black_concrete",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          // @ts-ignore
          particle(
            "minecraft:dust",
            [0, 0, 0],
            1,
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          summon("minecraft:block_display", rel(0, 0, 0), {
            transformation: {
              left_rotation: [
                NBT.float(0),
                NBT.float(0),
                NBT.float(0),
                NBT.float(1),
              ],
              right_rotation: [
                NBT.float(0),
                NBT.float(0),
                NBT.float(0),
                NBT.float(1),
              ],
              translation: [NBT.float(-2.5), NBT.float(0), NBT.float(-2.5)],
              scale: [NBT.float(5), NBT.float(5), NBT.float(5)],
            },
            block_state: { Name: "minecraft:black_concrete" },
            Tags: ["ghost_block_display"],
          });
          playsound(
            "minecraft:ambient.crimson_forest.mood",
            "master",
            "@a",
            rel(0, 0, 0)
          );
          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:block_display",
                    tag: "ghost_block_display",
                  })
                )
                .at(self)
                .run(() => {
                  kill(self);
                  particle(
                    // @ts-ignore
                    "minecraft:dust",
                    [0, 0, 0],
                    1,
                    rel(0, 0.8, 0),
                    [3, 3, 3],
                    0.1,
                    5000
                  );
                });
            },
            "5s",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ender",
        100,
        () => {
          particle(
            "minecraft:crimson_spore",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            2,
            "force"
          );
          particle(
            "minecraft:reverse_portal",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            4,
            "force"
          );
        },
        () => {
          spreadplayers(
            rel(0, 0),
            5,
            20,
            false,
            Selector("@e", {
              type: "#aestd1:living_base",
              sort: "nearest",
              distance: [Infinity, 8],
            })
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.inverted",
        100,
        () => {
          particle(
            // @ts-ignore
            "minecraft:sonic_boom",
            rel(0, 0.8, 0),
            [0.5, 0.5, 0.5],
            0,
            1,
            "force"
          );
          particle(
            "minecraft:angry_villager",
            rel(0, 0.8, 0),
            [0, 0.3, 0],
            0.01,
            1,
            "force"
          );
        },
        () => {
          summon("minecraft:marker", rel(0, 0, 0), {
            Tags: ["inverted_tnt_anchor"],
          });
          for (let i = 0; i <= 10; i += 1) {
            summon("minecraft:armor_stand", rel(Math.sin(i), 0, Math.cos(i)), {
              Tags: ["block_placer_aS_0", "block_placer"],
              Invisible: NBT.byte(1),
            });
            summon(
              "minecraft:armor_stand",
              rel(Math.sin(i), 0.5, Math.cos(i)),
              {
                Tags: ["block_placer_aS_30", "block_placer"],
                Invisible: NBT.byte(1),
              }
            );
            summon(
              "minecraft:armor_stand",
              rel(Math.sin(i), 1.5, Math.cos(i)),
              {
                Tags: ["block_placer_aS_60", "block_placer"],
                Invisible: NBT.byte(1),
              }
            );
          }
          execute
            .as(
              Selector("@e", {
                type: "minecraft:armor_stand",
                tag: "block_placer",
              })
            )
            .at(self)
            .run(() => {
              execute
                .facingEntity(
                  Selector("@e", {
                    type: "minecraft:marker",
                    tag: "inverted_tnt_anchor",
                  }),
                  "feet"
                )
                .run(() => {
                  tp(rel(0, 0, 0));
                });
              for (let i = 0; i < 13; i++) {
                tpAhead();
              }
              kill(self);
            });
        },
        null,
        null
      );
    });
});
