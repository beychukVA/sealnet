import React from 'react'
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
  Image,
  Card,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'

interface SealCardProps {
  footerHeading?: string
  footerBody?: string
  children?: React.ReactNode
  imageUrl?: string
}

const SealCard = (props: SealCardProps) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default SealCard
