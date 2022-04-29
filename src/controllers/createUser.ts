import {ServerResponse} from "http";
import {IPayloadModel} from "../app";

enum EnumPossibleRequests {
    GET = `GET`,
    POST = `POST`,
    PATCH = `PATCH`,
    PUT = `PUT`,
    DELETE = `DELETE`,
}

const checkCorrectMethod = <T extends EnumPossibleRequests>(method: T,allowedMethod: T ): boolean => {
    const checkMethod = !!method;
    const checkAllowed = !!allowedMethod;
    if(checkMethod && checkAllowed){
        return method === allowedMethod;
    }else{
        return false;
    }
};

const createUser = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    const { method,
            headers,
            params,
            path,
            body } = contract;
    res.setHeader(`Content-Type`,`application/json`);
    res.writeHead(200);
    res.end(JSON.stringify({message: `New User Created.`}));
};

export default createUser;
