import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  Box,
  Button,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Database, PlusCircle, Search, Sliders, Heart } from 'react-feather'
import Link from 'next/link'
import { createModuleResolutionCache } from 'typescript'

const menuTree = [
  {
    id: 0,
    label: 'Datasets',
    icon: Database,
    link: '/datasets',
    children: [
      {
        id: 1,
        label: 'Create Datasets',
        icon: PlusCircle,
        link: '/datasets/add',
      },
      {
        id: 2,
        label: 'Detect Faces',
        icon: Search,
        link: '/datasets/detect-faces',
      },
      {
        id: 3,
        label: 'Clean Data',
        icon: Sliders,
        link: '/datasets/clean-data',
      },
    ],
  },
  {
    id: 1,
    label: 'Seals',
    icon: Heart,
    link: '/seals',
    children: [
      {
        id: 1,
        label: 'Detect Seals',
        icon: PlusCircle,
        link: '/seals/detect-seals',
      },
    ],
  },
]

const MenuAccordion = () => {
  const router = useRouter()

  const expandedIndex = () => {
    const expanded = menuTree.find((menuItem) => {
      return router.pathname.includes(menuItem.link)
    })
    return expanded?.id
  }

  return (
    <Accordion index={expandedIndex()} allowToggle className="flex flex-col">
      {menuTree.map(({ icon: Icon, ...menu }) => {
        return (
          <AccordionItem key={menu.label}>
            <h2>
              <Link href={menu.link}>
                <AccordionButton>
                  <div style={{ width: '2.5rem' }}>
                    <Icon />
                  </div>
                  <Box
                    className="text-md font-medium text-text-light"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    {menu.label}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Link>
            </h2>
            <AccordionPanel>
              <VStack alignItems="flex-start" m="1rem">
                {menu.children.map((menuChild) => {
                  return (
                    <Link key={menuChild.label} href={menuChild.link}>
                      {menuChild.label}
                    </Link>
                  )
                })}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default MenuAccordion
