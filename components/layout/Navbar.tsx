import { faCog, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Group, Menu, Navbar, Text } from "@mantine/core";
import { User } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../../lib/auth/firebaseClient";

export default function Nav({ user }: { user: User | null }) {
  const router = useRouter();

  return (
    <Navbar width={{ base: 300 }} padding="xs" style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "92vh",
        }}
      >
        <Text>This is a navbar</Text>
        {user ? (
          <Group direction="column">
            <Divider />
            <Group>
              <Menu>
                <Menu.Label>Options</Menu.Label>
                <Menu.Item
                  onClick={() => router.push("/user/settings")}
                  icon={<FontAwesomeIcon icon={faCog} />}
                >
                  Settings
                </Menu.Item>
                <Divider />
                <Menu.Item
                  onClick={() => {
                    auth.signOut();
                    router.push("/login");
                  }}
                  color="red"
                  icon={<FontAwesomeIcon icon={faSignOut} />}
                >
                  Sign out
                </Menu.Item>
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    height={25}
                    width={25}
                    alt={user.displayName || user.email}
                  />
                ) : (
                  <Text>{user.email.charAt(0).toUpperCase()}</Text>
                )}
              </Menu>
              <Text>{user.displayName || user.email || user.phoneNumber}</Text>
            </Group>
          </Group>
        ) : null}
      </div>
    </Navbar>
  );
}
