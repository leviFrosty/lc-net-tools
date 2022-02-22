import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppShell,
  Group,
  Header,
  Navbar,
  Paper,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import Nav from "./Navbar";

type Props = {
  children?: any;
  hideNav?: boolean;
};

export default function Layout({ children, hideNav }: Props) {
  const { user } = useAuth();
  return (
    <AppShell
      padding="md"
      navbar={hideNav ? undefined : <Nav user={user} />}
      header={
        <Header height={60} padding="xs">
          <Group>
            <Link href="/" passHref>
              <a>
                <ThemeIcon size="xl">
                  <FontAwesomeIcon icon={faNetworkWired} />
                </ThemeIcon>
              </a>
            </Link>
            <Text size="xl">LightChange NetTools</Text>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
