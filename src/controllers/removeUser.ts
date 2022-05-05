import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {checkCorrectMethod, EnumPossibleRequests, validateToken} from "../utils/helpers";

const removeUser = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    const { method,
            headers,
            params,
            path,
            body } = contract;

    const hasToken = !!headers?.[`Authorization`];

    const token = String(headers?.[`Authorization`]).replace(`Bearer `,``);

    if(hasToken && validateToken(token,150,process.env.DOGLEAKS_SALT!)){
        if(checkCorrectMethod(EnumPossibleRequests.DELETE,method)){
            res.setHeader(`Content-Type`,`application/json`);
            res.writeHead(201);
            res.end(JSON.stringify({message: `User deleted.`}));
        }else{
            res.setHeader(`Content-Type`,`application/json`);
            res.writeHead(405);
            res.end(JSON.stringify({message: `Method not Allowed.`}));
        }
    }else{
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(401);
        res.end(JSON.stringify({message: `Unauthorized.`}));
    }
};

export default removeUser;
