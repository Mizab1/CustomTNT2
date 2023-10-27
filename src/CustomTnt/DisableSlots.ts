import {
  MCFunction,
  NBT,
  Selector,
  _,
  execute,
  rel,
  summon,
  tp,
} from "sandstone";
import { self } from "../Tick";

/**
 * Creates a slime entity with special attributes and effects.
 */
export const slimeEntity = () => {
  summon("minecraft:slime", rel(0, 0, 0), {
    NoGravity: NBT.byte(1),
    Tags: ["tnt.slime"],
    Size: 3,
    NoAI: NBT.byte(1),
    ActiveEffects: [
      {
        Id: NBT.byte(14),
        Amplifier: NBT.byte(1),
        Duration: 999999,
        ShowParticles: NBT.byte(0),
      },
    ],
  });
};

// Summon a slime at the position of TNT's armor stand to disable the slots of the armor stand so that player can't interact with it
export const spawnSlime = MCFunction("custom_tnt/spawn_slime", () => {
  execute
    .at(
      Selector("@e", { type: "armor_stand", tag: ["tnt.as", "gravity_base"] })
    )
    .unless(
      Selector("@e", {
        type: "minecraft:slime",
        tag: ["tnt.slime"],
        distance: [Infinity, 1],
      })
    )
    .run(() => {
      slimeEntity();
    });
});

// Teleport the slime to the Custom TNT (Armor Stand) nearby and if TNT is not found then kill the slime
export const teleportSlime = MCFunction("custom_tnt/teleport_slime", () => {
  execute
    .as(Selector("@e", { type: "minecraft:slime", tag: "tnt.slime" }))
    .at(self)
    .run(() => {
      _.if(
        Selector("@e", {
          type: "minecraft:armor_stand",
          tag: ["tnt.as", "gravity_base"],
          distance: [Infinity, 1],
        }),
        () => {
          execute
            .at(
              Selector("@e", {
                type: "minecraft:armor_stand",
                tag: ["tnt.as", "gravity_base"],
                distance: [Infinity, 1],
              })
            )
            .run.tp(self);
        }
      ).else(() => {
        tp(self, rel(0, -600, 0));
      });
    });
});
