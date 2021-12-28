import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
} from "@chakra-ui/react";
import { InputField } from "../components/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  return (
    <Box mt="40" w="100%" maxW="400" mx="auto">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
