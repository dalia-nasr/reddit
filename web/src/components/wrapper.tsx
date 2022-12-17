import { Box } from '@chakra-ui/react';

interface wrapperProps {
    children: any
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<wrapperProps> = ({ children, variant= 'regular' }) => {
        return (<Box mt={8} mx= "auto" maxW={variant=== "regular"? "800px": "400px"}>{children}</Box>);
};
