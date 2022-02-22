import { Center, Group, Text, Title } from "@mantine/core";
import React from "react";
import { AuthenticationForm } from "../components/auth/AuthenticationForm";
import Layout from "../components/layout/Layout";

export default function Login() {
  return (
    <Layout hideNav>
      <Center>
        <Group direction="column">
          <Center style={{ width: "100%" }}>
            <Title order={1}>Log in</Title>
          </Center>
          <AuthenticationForm></AuthenticationForm>
        </Group>
      </Center>
    </Layout>
  );
}
