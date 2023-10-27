import { MCFunction, NBT, Selector, data, execute } from "sandstone";
import { self } from "../../../Tick";

export const AddGravity = MCFunction("custom_tnt/auxillary/add_gravity", () => {
  // Add the gravity to the TNT
  execute
    .as(
      Selector("@e", {
        type: "minecraft:armor_stand",
        tag: ["tnt.as", "gravity_base"],
      })
    )
    .run(() => {
      data.merge.entity(self, {
        NoGravity: NBT.byte(0),
      });
    });
});
