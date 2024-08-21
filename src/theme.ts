import { type StyleFunctionProps, type ThemeConfig, extendTheme } from "@chakra-ui/react";

export const PRIMARY_COLOR = "orange";
export const PRIMARY = {
  50: `${PRIMARY_COLOR}.50`,
  100: `${PRIMARY_COLOR}.100`,
  200: `${PRIMARY_COLOR}.200`,
  300: `${PRIMARY_COLOR}.300`,
  400: `${PRIMARY_COLOR}.400`,
  500: `${PRIMARY_COLOR}.500`,
  600: `${PRIMARY_COLOR}.600`,
  700: `${PRIMARY_COLOR}.700`,
  800: `${PRIMARY_COLOR}.800`,
  900: `${PRIMARY_COLOR}.900`,
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        height: "100lvh",
        overflow: "hidden",
        overscrollBehavior: "none",
        bg: props.colorMode === "light" ? "gray.100" : undefined,
      },
      html: {
        height: "100lvh",
        overflow: "hidden",
        overscrollBehavior: "none",
      },
    }),
  },
});
