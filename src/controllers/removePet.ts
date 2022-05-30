import { ServerResponse } from "http";
import { IPayloadModel } from "../app";
import {bodyParser, checkCorrectMethod, checkExistentToken, EnumPossibleRequests} from "../utils/helpers";
import Pet, { IPet, PetHealthState } from "../models/Pet";

const removePet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    res.setHeader(`Content-Type`,`application/json`);

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

    const petId = params?.get(`id`);

    if(checkExistentToken(headers!)) {
        if(checkCorrectMethod(EnumPossibleRequests.DELETE,method)){
            res.writeHead(201);
            res.end(JSON.stringify(pet));
        }else{
            res.writeHead(405);
            res.end(JSON.stringify({message: `Method not Allowed.`}));
        }
    } else {
        res.writeHead(401);
        res.end(JSON.stringify({message: `Unauthorized.`}));
    }
};

export default removePet;
