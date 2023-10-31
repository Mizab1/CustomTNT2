import {
  MCFunction,
  MCFunctionInstance,
  Selector,
  execute,
  loc,
  rel,
  setblock,
  tp,
} from "sandstone";
import { self } from "../../../Tick";

export const tpAhead: MCFunctionInstance = MCFunction(
  "custom_tnt/auxillary/inverted_tnt/tp_ahead_and_place_block",
  () => {
    execute.at(self).run(() => {
      // Call this function on the context of block placer (both positional and execution)
      tp(self, loc(0, 0, -1));
      setblock(rel(0, 0, 0), "minecraft:dirt");
    });
  }
);
