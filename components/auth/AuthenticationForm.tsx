import React, { useState } from "react";
import { useForm } from "@mantine/hooks";
// import { EnvelopeClosedIcon, LockClosedIcon } from "@modulz/radix-icons";

import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/auth/firebaseClient";
import { useRouter } from "next/router";

export interface AuthenticationFormProps {
  noShadow?: boolean;
  noPadding?: boolean;
  noSubmit?: boolean;
  style?: React.CSSProperties;
}

export function AuthenticationForm({
  noShadow,
  noPadding,
  noSubmit,
  style,
}: AuthenticationFormProps) {
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useMantineTheme();
  const router = useRouter();

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
    setError(null);
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: true,
    },

    validationRules: {
      firstName: (value) => formType === "login" || value.trim().length >= 2,
      lastName: (value) => formType === "login" || value.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/.test(value),
      confirmPassword: (val, values) =>
        formType === "login" || val === values.password,
    },

    errorMessages: {
      email: "Invalid email",
      password:
        "Password should contain 1 number, 1 letter and at least 6 characters",
      confirmPassword: "Passwords don't match. Try again",
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setError(null);

    if (formType === "login") {
      signInWithEmailAndPassword(auth, form.values.email, form.values.password)
        .then(() => router.push("/"))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
    if (formType == "register") {
      createUserWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      )
        .then(() => router.push("/"))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Paper
      padding={noPadding ? 0 : "lg"}
      shadow={noShadow ? undefined : "sm"}
      style={{
        position: "relative",
        maxWidth: 500,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        ...style,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        {formType === "register" && (
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder="Your first name"
              label="First name"
              {...form.getInputProps("firstName")}
            />

            <TextInput
              required
              placeholder="Your last name"
              label="Last name"
              {...form.getInputProps("lastName")}
            />
          </Group>
        )}

        <TextInput
          mt="md"
          required
          placeholder="Your email"
          label="Email"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          mt="md"
          required
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password")}
        />

        {formType === "register" && (
          <PasswordInput
            mt="md"
            required
            label="Confirm Password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
        )}

        {formType === "register" && (
          <Checkbox
            mt="xl"
            label="I agree to sell my soul and privacy to this corporation"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
        )}

        {error && (
          <Text color="red" size="sm" mt="sm">
            {error}
          </Text>
        )}

        {!noSubmit && (
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              onClick={toggleFormType}
              size="sm"
            >
              {formType === "register"
                ? "Have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>

            <Button color="blue" type="submit">
              {formType === "register" ? "Register" : "Login"}
            </Button>
          </Group>
        )}
      </form>
    </Paper>
  );
}
