import { Flex, Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import router from 'next/router';
import React, { useState } from 'react'
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import {Login} from './login';


const forgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const[, forgotPassword] = useForgotPasswordMutation();
        return (
            <Wrapper variant='small'>
                <DarkModeSwitch></DarkModeSwitch>
            <Formik
            initialValues = {{email: ""}}
            onSubmit = {async (values) => {
                await forgotPassword(values);
                setComplete(true);         
            }}
            >
                {( {isSubmitting })=> complete ? <Box> check the sent email to this account</Box> : (
                    <Form >
                        <InputField name='email' placeholder='email' label='Email' type='email' />
                        <Button mt={4} type="submit" color='teal' isLoading={isSubmitting}> Forgot Password</Button>
                    </Form>
                )}
            </Formik>
            </Wrapper>
        );

}
export default withUrqlClient(createUrqlClient)(forgotPassword);
