// Init FontAwesome components
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// Init Mantine Providers for theming and dark/light mode localStorage
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorageValue } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthProvider } from "../lib/auth/AuthContext";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  // Stores theme data in localStorage
  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });

  // Theme toggler handler
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // Globally listens for hotkey ctrl+J or cmd+J to toggle theme
  useHotkeys([
    [
      "mod+J",
      () => {
        console.log("hotkey pressed");
        toggleColorScheme();
      },
    ],
  ]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <NotificationsProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
