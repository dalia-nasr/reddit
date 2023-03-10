import React from 'react';
import {Form, Formik} from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Wrapper } from '../components/wrapper';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { InputField } from '../components/inputField';
import { useMutation } from 'urql';
import { useLoginMutation} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';


export const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
        return (
            <Wrapper variant='small'>
                <DarkModeSwitch></DarkModeSwitch>
            <Formik
            initialValues = {{usernameOrEmail: "", password: ""}}
            onSubmit = {async (values, {setErrors}) => {
                const response = await login(values);
                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data?.login.user) {
                    router.push("/")
                }           
            }}
            >
                {( {isSubmitting })=>(
                    <Form >
                        <InputField name='usernameOrEmail' placeholder='username or Email' label='username or Email' />
                        <Box mt={4}> <InputField name='password' placeholder='password' label='Password' type='password' /> </Box>
                        <Flex mt={2}>
                            <NextLink href="/forgot-password">
                                <Link ml="auto"> forgot password? </Link>
                            </NextLink>
                        </Flex>
                        <Button mt={4} type="submit" color='teal' isLoading={isSubmitting}> Login</Button>
                    </Form>
                )}
            </Formik>
            </Wrapper>
        );
}
export default withUrqlClient(createUrqlClient)(Login)