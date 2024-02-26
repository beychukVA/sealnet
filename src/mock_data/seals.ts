import { v4 as uuid } from 'uuid'
import _ from 'underscore'
import Chance from 'chance'
import { Seal, SealRecognition } from '../types/SealTypes'
const chance = new Chance()

const seals = [
  {
    name: 'Dagon',
    images: [
      'DSCN4515_ChippedAt_2560_360_2700_484.jpeg',
      'DSCN4510_ChippedAt_2992_424_3136_544.jpeg',
      'DSCN4523_ChippedAt_3888_256_4008_360.jpeg',
      'Seal58A_ChippedAt_237_125_368_241.jpeg',
      'Seal58B_ChippedAt_175_102_308_216.jpeg',
    ],
  },
  {
    name: 'Sonny',
    images: [
      'DSCN4644_ChippedAt_3740_632_4080_960.jpeg',
      'DSCN4644_ChippedAt_3740_632_4080_960.jpeg',
    ],
  },
  {
    name: 'Raegan',
    images: [
      'DSCN4683_ChippedAt_338_478_620_730.jpeg',
      'DSCN4697_ChippedAt_1236_426_1440_608.jpeg',
    ],
  },
  {
    name: 'Juneau',
    images: [
      'DSCN4942_ChippedAt_1648_304_1872_512.jpeg',
      'DSCN4947_ChippedAt_2216_232_2448_448.jpeg',
      'DSCN4977_ChippedAt_912_285_1113_459.jpeg',
      'DSCN4979_ChippedAt_853_244_1024_395.jpeg',
      'DSCN4980_ChippedAt_816_192_996_360.jpeg',
      'DSCN4981_ChippedAt_540_273_714_429.jpeg',
    ],
  },
  {
    name: 'Shadow',
    images: [
      'DSCN4906_ChippedAt_1348_428_1656_708.jpeg',
      'DSCN4909_ChippedAt_952_396_1164_604.jpeg',
      'DSCN4910_ChippedAt_1408_464_1640_692.jpeg',
      'DSCN4918_ChippedAt_396_432_660_664.jpeg',
      'DSCN4920_ChippedAt_3764_408_4036_648.jpeg',
      'DSCN4951_ChippedAt_1443_465_1683_687.jpeg',
      'DSCN4963_ChippedAt_63_387_270_573.jpeg',
      'DSCN4966_ChippedAt_180_432_376_600.jpeg',
      'DSCN4991_ChippedAt_208_344_372_484.jpeg',
    ],
  },
  {
    name: 'Yeti',
    images: [
      'DSCN4793_ChippedAt_2384_383_2504_490.jpeg',
      'DSCN4793_ChippedAt_2384_383_2504_490.jpeg',
    ],
  },
  {
    name: 'Wonder',
    images: [
      'DSCN3290_ChippedAt_2126_138_2312_306.jpeg',
      'DSCN3304_ChippedAt_891_99_1095_281.jpeg',
      'DSCN3379_ChippedAt_1716_258_1941_456.jpeg',
      'DSCN3387_ChippedAt_854_315_1278_692.jpeg',
      'DSCN3390_ChippedAt_3084_168_3468_525.jpeg',
      'DSCN3406_ChippedAt_2556_342_2796_561.jpeg',
      'DSCN3407_ChippedAt_2610_324_2856_546.jpeg',
      'DSCN3501_ChippedAt_780_475_1074_737.jpeg',
      'DSCN3514_ChippedAt_2324_376_2612_628.jpeg',
      'DSCN3521_ChippedAt_1152_476_1444_724.jpeg',
    ],
  },
]

// const generateObservations = (number: number): SealRecognition[] => {
// 	return Array.from({ length: number }, () => (
// 		{
// 			id: uuid(),
// 			createdAt: chance.timestamp(),
// 			updatedAt: chance.timestamp(),
// 			likelihood: chance.floating({ min: 0.3, max: 0.9 }),
// 			verified: _.sample([false, true]),
// 			imageUrl: "https://placekitten.com/50/50",
// 			observationId: uuid()
// 		}
// 	));
// }
// const getRandomArbitrary = (min: number, max: number): number => {
// 	return Math.random() * (max - min) + min;
// }

export const mockSeals: Seal[] = seals.map((seal) => {
  return {
    id: uuid(),
    name: seal.name,
    createdAt: chance.timestamp(),
    updatedAt: chance.timestamp(),
    imageUrl: `/seals/${seal.name}/${seal.images[0]}`,
    observations: seal.images.slice(1).map((imageUrl) => {
      return {
        id: uuid(),
        createdAt: chance.timestamp(),
        updatedAt: chance.timestamp(),
        likelihood: chance.floating({ min: 0.3, max: 0.9 }),
        verified: _.sample([false, true]),
        imageUrl: `/seals/${seal.name}/${imageUrl}`,
        observationId: uuid(),
      } as SealRecognition
    }),
  }
})
