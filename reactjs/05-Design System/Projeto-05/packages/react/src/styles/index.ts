/* eslint-disable spaced-comment */
import { createStitches, defaultThemeMap } from '@stitches/react'
import {
  colors,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  radii,
  space,
} from '@ignite-ui-diego/tokens'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  themeMap: {
    // themeMap nos dá a possibilidade de adicionar novos valores, na largura e altura implementamos os tokens
    ...defaultThemeMap, //adicionar as opções default do stitches
    height: 'space', //agora quando escrever height irá aparecer opções do tokens space para usar.
    width: 'space',
  },
  theme: {
    colors,
    fontSizes,
    fontWeights,
    fonts,
    lineHeights,
    radii,
    space,
  },
})
