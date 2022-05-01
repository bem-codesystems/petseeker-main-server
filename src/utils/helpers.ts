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
        if(buffer.length > 0){
            return JSON.parse(buffer);
        }
    }catch(err){
        return {}
    }
}
