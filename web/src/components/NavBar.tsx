import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: LogoutFetching}, logout] = useLogoutMutation();    
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
});    
    let body = null;

    // data is loading
    if (fetching) {
    //user not logged in
    } else if (!data?.me) {
        body = (
            <>
            <NextLink href='/login'><Link mr={2}> Login </Link></NextLink> 
            <NextLink href='/register'><Link> Register</Link></NextLink>
            </>
        )
    // user is logged in
    } else {
        body = (
            <Flex>
            <Box mr={2}> <div>{data.me.username}</div></Box>
            <Button onClick={()=> {
                logout();
            }}
            isLoading = {LogoutFetching} 
            variant="link"> logout</Button>
            </Flex>
        )
    }

    return (
            <Flex bg='tan' p={4}>
            <Box  ml={'auto'}>
                {body}
            </Box>
            </Flex>
        );
}
export default withUrqlClient(createUrqlClient)(NavBar);

