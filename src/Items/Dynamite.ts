// import {
//   MCFunction,
//   NBT,
//   Predicate,
//   PredicateInstance,
//   Selector,
//   _,
//   execute,
//   fill,
//   give,
//   kill,
//   particle,
//   playsound,
//   raw,
//   rel,
// } from "sandstone";
// import { self } from "../Tick";
// import { i } from "../Utils/Functions";

// /**
//  * A function run by all snowballs to check if it hit the ground
//  */
// export const hitGround = MCFunction("items/dynamite/hit_ground", () => {
//   execute
//     .as(Selector("@e", { type: "minecraft:snowball" }))
//     .at(self)
//     .run(() => {
//       execute.if
//         .entity(Selector("@s", { predicate: isNuclearDynamite }))
//         .run(() => {
//           particle("minecraft:flame", rel(0, 0, 0), [0.3, 0.3, 0.3], 0.1, 5);
//           particle(
//             "minecraft:soul_fire_flame",
//             rel(0, 0, 0),
//             [0.3, 0.3, 0.3],
//             0,
//             5
//           );
//           for (let i = -0.5; i <= 0.5; i += 0.5) {
//             for (let j = -0.5; j <= 0.5; j += 0.5) {
//               for (let k = -0.5; k <= 0.5; k += 0.5) {
//                 _.if(_.not(_.block(rel(i, j, k), "air")), () => {
//                   raw(
//                     `summon fireball ~ ~-1 ~ {ExplosionPower:20b,power:[0.0,-1.0,0.0]}`
//                   );
//                   kill(self);
//                 });
//               }
//             }
//           }
//         });
//       execute.if
//         .entity(Selector("@s", { predicate: isAcidDynamite }))
//         .run(() => {
//           for (let i = -0.5; i <= 0.5; i += 0.5) {
//             for (let j = -0.5; j <= 0.5; j += 0.5) {
//               for (let k = -0.5; k <= 0.5; k += 0.5) {
//                 _.if(_.not(_.block(rel(i, j, k), "minecraft:bedrock")), () => {
//                   fill(rel(2, 2, 2), rel(-2, -2, -2), "minecraft:air");
//                   playsound(
//                     "minecraft:block.ancient_debris.break",
//                     "master",
//                     "@a",
//                     rel(0, 0, 0),
//                     0.1
//                   );
//                   particle(
//                     // @ts-ignore
//                     "minecraft:dust",
//                     [0.345, 0.769, 0.102],
//                     1,
//                     rel(0, 0, 0),
//                     [0.3, 0.3, 0.3],
//                     1,
//                     1
//                   );
//                   particle(
//                     "minecraft:landing_lava",
//                     rel(0, 0, 0),
//                     [0.3, 0.3, 0.3],
//                     1,
//                     1
//                   );
//                 });
//               }
//             }
//           }
//         });
//     });
// });

// const isNuclearDynamite: PredicateInstance = Predicate("if_nuclear_dynamite", {
//   condition: "minecraft:entity_properties",
//   entity: "this",
//   predicate: {
//     type: "minecraft:snowball",
//     nbt: "{Item:{tag:{nuclear_dynamite:1b}}}",
//   },
// });
// const isAcidDynamite: PredicateInstance = Predicate("if_acid_dynamite", {
//   condition: "minecraft:entity_properties",
//   entity: "this",
//   predicate: {
//     type: "minecraft:snowball",
//     nbt: "{Item:{tag:{acid_dynamite:1b}}}",
//   },
// });

// /**
//  * A standalone function to give a nuclear dynamite to the current executing player
//  */
// const giveNuclearDynamite = MCFunction(
//   "items/dynamite/give_nuclear_dynamite",
//   () => {
//     give(
//       self,
//       i("minecraft:snowball", {
//         display: {
//           Name: '{"text":"Nuclear Dynamite","color":"red", "italic":false}',
//         },
//         CustomModelData: 100001,
//         nuclear_dynamite: NBT.byte(1),
//       }),
//       1
//     );
//   }
// );

// /**
//  * A standalone function to give a acid dynamite to the current executing player
//  */
// const giveAcidDynamite = MCFunction("items/dynamite/give_acid_dynamite", () => {
//   give(
//     self,
//     i("minecraft:snowball", {
//       display: {
//         Name: '{"text":"Acid Dynamite","color":"red", "italic":false}',
//       },
//       CustomModelData: 100002,
//       acid_dynamite: NBT.byte(1),
//     }),
//     1
//   );
// });
