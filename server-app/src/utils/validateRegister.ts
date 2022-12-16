import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput"

export const validateRegister = (options: UsernamePasswordInput) => {
    if(!options.email.includes("@")){
        return [{
                field: 'email',
                message: 'Invalid email',
            }]
    }

    if(options.username.length <=2){
        return  [{
                field: 'username',
                message: 'Username must be at least 2 characters',
            }]
    }
    if(options.username.includes("@")){
        return  [{
                field: 'username',
                message: 'Cannot incude an @',
            }]
    }

    if(options.password.length <=2){
        return  [{
                field: 'password',
                message: 'password must be at least 3 characters',
            }]
    }
    return null;
}