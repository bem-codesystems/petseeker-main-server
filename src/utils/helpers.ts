export enum EnumPossibleRequests {
    GET = `GET`,
    POST = `POST`,
    PATCH = `PATCH`,
    PUT = `PUT`,
    DELETE = `DELETE`,
}

export const checkCorrectMethod = <T extends EnumPossibleRequests>(method: T,allowedMethod: string|undefined ): boolean => {
    const checkMethod = !!method;
    const checkAllowed = !!allowedMethod;
    if(checkMethod && checkAllowed){
        return method === allowedMethod;
    }else{
        return false;
    }
};

type buffer = string;

export function bodyParser<T extends buffer>(buffer:T){
    try{
        return JSON.parse(buffer);
    }catch(err){
        return {}
    }
}

interface ITokenCheck {
    token: string;
    length: number;
    salt: string;
}

export function validateToken<K extends keyof ITokenCheck>(token: string, length: number, salt: string): boolean {
    try{
        return token.length === length && token.startsWith(salt);
    }catch(err){
        return false
    }
}
