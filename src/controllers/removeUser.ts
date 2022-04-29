import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {checkCorrectMethod, EnumPossibleRequests} from "../utils/helpers";

const removeUser = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    const { method,
            headers,
            params,
            path,
            body } = contract;
    if(checkCorrectMethod(EnumPossibleRequests.DELETE,method)){
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(201);
        res.end(JSON.stringify({message: `User deleted.`}));
    }else{
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(405);
        res.end(JSON.stringify({message: `Method not Allowed.`}));
    }
};

export default removeUser;
