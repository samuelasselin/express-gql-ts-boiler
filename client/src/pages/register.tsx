import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Box } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [executeRegister] = useRegisterMutation();

  return (
    <Box mt="40" w="100%" maxW="400" mx="auto">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await executeRegister({
            variables: {
              options: {
                email: values.email,
                password: values.password,
              },
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/dashboard");
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
