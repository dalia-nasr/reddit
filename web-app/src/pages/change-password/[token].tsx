import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next'; 
import { withUrqlClient } from 'next-urql';
import { NextURL } from 'next/dist/server/web/next-url';
import router, { useRouter } from 'next/router';
import { useState } from 'react';
import { DarkModeSwitch } from '../../components/DarkModeSwitch';
import { InputField } from '../../components/inputField';
import { Wrapper } from '../../components/wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import NextLink from 'next/link';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';

const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const[, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");
        return (
            <Wrapper variant='small'>
                <DarkModeSwitch></DarkModeSwitch>
            <Formik
            initialValues = {{newPassword: ""}}
            onSubmit = {async (values, {setErrors}) => {
                const response = await changePassword({token , newPassword: values.newPassword });

                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors)
                    if('token' in errorMap) {
                        setTokenError(errorMap.token);
                    } 
                    setErrors(errorMap);
                    console.log(response.data.changePassword.errors)

                } else if (response.data?.changePassword.user) {
                    router.push("/")
                }           
            }}
            >
                {( {isSubmitting })=>(
                    <Form>
                        <InputField name='newPassword' placeholder='new password' label='new password' type="password"/>
                        {tokenError
                        ? <Flex> 
                            <Box mr={4} color='red.500'> 
                            {tokenError}  
                            </Box>
                            <NextLink href="/forgot-password"><Link> Click here to get a new token</Link></NextLink>
                            </Flex>
                        : null }
                        <Button mt={4} type="submit" color='teal' isLoading={isSubmitting}> Change Password </Button>
                    </Form>
                )}
            </Formik>
            </Wrapper>
        );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}
export default withUrqlClient(createUrqlClient)(ChangePassword)