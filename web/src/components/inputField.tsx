import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react'

type inputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

export const InputField: React.FC<inputFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, {error, }] = useField(props);
        return (
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{label}</FormLabel>
                <Input {...field} {...props} id={field.name} />
                { error? <FormErrorMessage>{error}</FormErrorMessage> : null}
            </FormControl>
        );
};