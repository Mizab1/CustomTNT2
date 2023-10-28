import { MCFunction, Selector, execute, particle, rel } from "sandstone";

export const Fireball = MCFunction("objects/fireball", () => {
  execute.at(Selector("@e", { type: "minecraft:fireball" })).run(() => {
    particle(
      "minecraft:flame",
      rel(0, 0, 0),
      [0.3, 0.3, 0.3],
      0.1,
      20,
      "force"
    );
    particle(
      "minecraft:soul_fire_flame",
      rel(0, 0, 0),
      [0.3, 0.3, 0.3],
      0,
      20,
      "force"
    );
    particle(
      "minecraft:campfire_cosy_smoke",
      rel(0, 0, 0),
      [0.5, 1, 0.5],
      0.1,
      20,
      "force"
    );
  });
});
