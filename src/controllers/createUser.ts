import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {checkCorrectMethod, checkExistentToken, EnumPossibleRequests} from "../utils/helpers";

const createUser = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    res.setHeader(`Content-Type`,`application/json`);
    const { method,
            headers,
            params,
            path,
            body } = contract;
    if(checkExistentToken(headers!)) {
        if(checkCorrectMethod(EnumPossibleRequests.POST,method)){
            res.writeHead(201);
            res.end(JSON.stringify({message: `New User Created.`}));
        }else{
            res.writeHead(405);
            res.end(JSON.stringify({message: `Method not Allowed.`}));
        }
    } else {
        res.writeHead(401);
        res.end(JSON.stringify({message: `Unauthorized.`}));
    }
};

export default createUser;
