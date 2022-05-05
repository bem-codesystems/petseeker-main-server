import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {bodyParser, checkCorrectMethod, EnumPossibleRequests, validateToken} from "../utils/helpers";
import Pet, {IPet, PetHealthState} from "../models/Pet";

const removePet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    const { method,
            headers,
            params,
            path,
            body } = contract;

    const parsedBody: IPet = bodyParser(body!);

    const { type,size } = parsedBody;

    const pet: IPet = new Pet(
        type,
        size,
        PetHealthState.Healthy,
        [],
        Date.now(),
        null,
    );

    const hasToken = !!headers?.[`Authorization`];

    const token = String(headers?.[`Authorization`]).replace(`Bearer `,``);

    if(hasToken && validateToken(token,150,process.env.DOGLEAKS_SALT!)){
        if(checkCorrectMethod(EnumPossibleRequests.DELETE,method)){
            res.setHeader(`Content-Type`,`application/json`);
            res.writeHead(201);
            res.end(JSON.stringify(pet));
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

export default removePet;
