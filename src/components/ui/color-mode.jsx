// 'use client'

import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

import theme from '../../styles/theme'

export function ColorModeProvider (props) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
  )
}

export function useColorMode () {
  const { resolvedTheme, setTheme } = useTheme()
  console.log({ resolvedTheme })
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
    colors: theme[resolvedTheme ?? 'light']
  }
}

export function useColorModeValue (light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'light' ? light : dark
}

export function ColorModeIcon () {
  const { colorMode } = useColorMode()
  return colorMode === 'light' ? <LuSun /> : <LuMoon />
}

export const ColorModeButton = () => {
  const { toggleColorMode,colors } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      variant='ghost'
      size={'lg'}
      rounded='full'
      colorScheme='gray'
      color={colors.textInverted}
            _hover={{ bg: colors.textSecondary }}
    >
      <ColorModeIcon />
    </IconButton>
  )
}
