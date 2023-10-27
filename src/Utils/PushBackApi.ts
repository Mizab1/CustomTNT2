import {
  MCFunction,
  Selector,
  execute,
  functionCmd,
  kill,
  loc,
  raw,
} from "sandstone";

const self = Selector("@s");

export const pushBackApi = MCFunction("util/push_back", () => {
  execute
    .as(Selector("@a", { tag: ["!pushback_user"], distance: [Infinity, 10] }))
    .at(
      Selector("@e", {
        type: "minecraft:armor_stand",
        tag: ["pushback.aS"],
      })
    )
    .run(() => {
      // delta api stuff
      raw(`scoreboard players set $strength delta.api.launch 100000`);
      execute
        .as(
          Selector("@a", { tag: ["!pushback_user"], distance: [Infinity, 10] })
        )
        .at(self)
        .facingEntity(
          Selector("@e", {
            type: "minecraft:armor_stand",
            tag: ["pushback.aS"],
            limit: 1,
            sort: "nearest",
          }),
          "feet"
        )
        .facing(loc(0, 0, -1))
        .run(() => {
          functionCmd("delta:api/launch_looking");
        });
      kill(
        Selector("@e", {
          type: "minecraft:armor_stand",
          tag: ["pushback.aS"],
          limit: 1,
          sort: "nearest",
        })
      );
    });
});
