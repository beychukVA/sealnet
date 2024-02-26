import { v4 as uuid } from 'uuid'
import { Observation } from '../types/Observation'
import Chance from 'chance'

const chance = new Chance()

const mockObsFolders = [
  {
    name: 'July 7th Branning Ledge Cropped',
    imageData: [
      'DSCN0069.jpeg',
      'DSCN0073.jpeg',
      'DSCN0080.jpeg',
      'DSCN0089.jpeg',
      'DSCN0094.jpeg',
      'DSCN0100.jpeg',
      'DSCN0104.jpeg',
      'DSCN0111.jpeg',
      'DSCN0117.jpeg',
      'DSCN0120.jpeg',
      'DSCN0122.jpeg',
      'DSCN0128.jpeg',
      'DSCN0132.jpeg',
      'DSCN0133.jpeg',
      'DSCN0134.jpeg',
      'DSCN0135.jpeg',
      'DSCN0137.jpeg',
      'DSCN0139.jpeg',
      'DSCN0142.jpeg',
      'DSCN0144.jpeg',
      'DSCN0145.jpeg',
    ],
  },
  {
    name: 'July 7th Lookout Point',
    imageData: [
      'DSCN0271.jpeg',
      'DSCN0274.jpeg',
      'DSCN0275.jpeg',
      'DSCN0277.jpeg',
      'DSCN0278.jpeg',
      'DSCN0281.jpeg',
      'DSCN0282.jpeg',
      'DSCN0289.jpeg',
      'DSCN0291.jpeg',
      'DSCN0293.jpeg',
      'DSCN0295.jpeg',
      'DSCN0296.jpeg',
      'DSCN0298.jpeg',
    ],
  },
  {
    name: 'July 8th Seal Rock Cropped',
    imageData: ['DSCN0413.jpeg'],
  },
  {
    name: 'July 10th Brandt Ledge Cropped',
    imageData: ['DSCN0755.JPG', 'DSCN0762.JPG', 'DSCN0766.JPG'],
  },
  {
    name: 'July 13th Grassy Ledge Cropped',
    imageData: [
      'DSCN1461.JPG',
      'DSCN1502.JPG',
      'DSCN1507.JPG',
      'DSCN1515.JPG',
      'DSCN1530.JPG',
      'DSCN1532.JPG',
    ],
  },
  {
    name: 'July 19th French Island Cropped',
    imageData: [
      'DSCN2203.JPG',
      'DSCN2204.JPG',
      'DSCN2206.JPG',
      'DSCN2210.JPG',
      'DSCN2211.JPG',
      'DSCN2214.JPG',
      'DSCN2215.JPG',
      'DSCN2216.JPG',
      'DSCN2217.JPG',
      'DSCN2218.JPG',
      'DSCN2221.JPG',
      'DSCN2222.JPG',
      'DSCN2224.JPG',
      'DSCN2226.JPG',
      'DSCN2229.JPG',
      'DSCN2231.JPG',
      'DSCN2232.JPG',
    ],
  },
]

const makeMockObservations = (): Array<Observation> => {
  return mockObsFolders.map((folder, index) => {
    return {
      id: uuid(),
      createdAt: chance.timestamp(),
      updatedAt: chance.timestamp(),
      imageData: folder.imageData.map(
        (imgName) => `/observations/${folder.name}/${imgName}`
      ),
      researcher: {
        userId: uuid(),
        firstName: chance.first(),
        lastName: chance.last(),
      },
      metaData: {
        dateCaptured: chance.date(),
        location: {
          lat: chance.latitude(),
          long: chance.longitude(),
        },
        description: chance.paragraph(),
      },
      status: index % 2 === 0 ? 'verified' : 'unverified',
    }
  })
}

export const mockData: Array<Observation> = makeMockObservations()
