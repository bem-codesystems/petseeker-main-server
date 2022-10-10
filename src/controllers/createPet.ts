import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {bodyParser, checkCorrectMethod, checkExistentToken, EnumPossibleRequests} from "../utils/helpers";
import Pet, {IPet, PetHealthState} from "../models/Pet";

const createPet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    res.setHeader(`Content-Type`,`application/json`);

    const { method,
            headers,
            params,
            path,
            body } = contract;

    const parsedBody: IPet = bodyParser(body!);

    const { type,size } = parsedBody;

    const id = params?.get('id');

    const pet: IPet = new Pet(
        id!,
        type,
        size,
        PetHealthState.Healthy,
        [],
        Date.now(),
        null,
    );

    if(checkExistentToken(headers!)) {
        if(checkCorrectMethod(EnumPossibleRequests.POST,method)){
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

export default createPet;
