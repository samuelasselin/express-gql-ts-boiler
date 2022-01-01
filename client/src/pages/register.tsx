import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Box } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();

  return (
    <Box mt="40" w="100%" maxW="400" mx="auto">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            options: {
              email: values.email,
              password: values.password,
            },
          });
          if (response.data?.register.errors) {
            const { field, message } = response.data?.register.errors[0];
            setErrors({
              [field]: message,
            });
          }
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
