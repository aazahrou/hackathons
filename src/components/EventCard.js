import React from 'react'
import Tilt from 'react-tilt'
import {
  Box,
  Card,
  Link,
  Heading,
  Image,
  Text,
  Flex,
  theme,
} from '@hackclub/design-system'

const humanizeDistance = num => {
  if (num <= 100) {
    return parseFloat(num.toFixed(1))
  } else {
    return Math.round(num)
  }
}

const Logo = Image.extend.attrs({
  w: 60,
})`
  display: inline;
  border-radius: 5px;
`

const EventCard = Card.extend.attrs({
  m: 2,
  p: 3,
  align: 'center',
  boxShadowSize: 'md',
  color: 'white',
})`
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.32);
  background: ${props => tintedBackground(props.background)} no-repeat;
  background-size: cover;
`

const Base = Box.withComponent(Tilt).extend.attrs({
  options: {
    max: 15,
    scale: 1.05,
  },
})`
  flex: ${100 / 3}%;
  min-width: ${props => props.theme.space[3]}em;
`

const tintedBackground = img => `
  linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.45) 75%
  ),
  url(${img})
`

const pathToUrl = path => (path ? `https://api.hackclub.com/${path}` : null)

export default ({
  website,
  name,
  start,
  end,
  startHumanized,
  endHumanized,
  city,
  state,
  bannerPath,
  logoPath,
  distanceTo,
  startYear,
}) => (
  <Base>
    <Link href={website} target="_blank">
      <EventCard background={pathToUrl(bannerPath)}>
        <Logo src={pathToUrl(logoPath)} />
        <Heading.h3 fontWeight="normal">{name}</Heading.h3>
        <Flex justify="space-between">
          <Text>
            {start === end
              ? startHumanized
              : `${startHumanized}–${endHumanized}`}
            {new Date().getFullYear() !== parseInt(startYear)
              ? `, ${startYear}`
              : null}
          </Text>
          <Text>
            {distanceTo
              ? `${humanizeDistance(distanceTo)} miles`
              : `${city}, ${state}`}
          </Text>
        </Flex>
      </EventCard>
    </Link>
  </Base>
)
