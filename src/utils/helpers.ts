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
