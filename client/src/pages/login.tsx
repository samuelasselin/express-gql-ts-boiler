import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();

  const [executeLogin] = useLoginMutation();

  return (
    <Box mt="40" w="100%" maxW="400" mx="auto">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await executeLogin({
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
                  me: data?.login.user,
                },
              });
            },
          });
          if (response.data.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user.id) {
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
              placeholder="Enter your password"
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

export default Login;
