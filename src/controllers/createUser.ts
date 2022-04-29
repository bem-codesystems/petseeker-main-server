import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {checkCorrectMethod, EnumPossibleRequests} from "../utils/helpers";

const createUser = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    const { method,
            headers,
            params,
            path,
            body } = contract;
    if(checkCorrectMethod(EnumPossibleRequests.POST,method)){
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(201);
        res.end(JSON.stringify({message: `New User Created.`}));
    }else{
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(405);
        res.end(JSON.stringify({message: `Method not Allowed.`}));
    }
};

export default createUser;
