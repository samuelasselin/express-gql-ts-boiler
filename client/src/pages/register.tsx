import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Box } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUTATION = `mutation Register($options: UserNamePasswordEmail!) {
  register(options: $options) {
    userName
    id
  }
}`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);

  return (
    <Box mt="40" w="100%" maxW="400" mx="auto">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values) => {
          const response = await register({
            options: {
              userName: values.username,
              password: values.password,
              email: values.email,
            },
          });

          console.log(response);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              placeholder="Enter your email"
              label="Email"
              name="email"
            />
            <InputField
              placeholder="Choose a username"
              label="Username"
              name="username"
            />
            <InputField
              placeholder="Choose a password"
              name="password"
              label="Password"
              type="password"
            />

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
