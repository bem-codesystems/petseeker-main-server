import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {checkCorrectMethod, checkExistentToken, EnumPossibleRequests} from "../utils/helpers";

const ping = (contract: IPayloadModel<string, undefined>,res: ServerResponse) => {
    res.setHeader(`Content-Type`,`application/json`);
    const { method,headers } = contract;
        if(checkExistentToken(headers!)) {
            if(checkCorrectMethod(EnumPossibleRequests.GET,method)){
                res.writeHead(200);
                res.end(JSON.stringify({message: `Pong.`}));
            }else{
                res.writeHead(405);
                res.end(JSON.stringify({message: `Method not Allowed.`}));
            }
        } else {
            res.writeHead(401);
            res.end(JSON.stringify({message: `Unauthorized.`}));
        }
};

export default ping;
