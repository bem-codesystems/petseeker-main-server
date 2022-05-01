import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {bodyParser, checkCorrectMethod, EnumPossibleRequests} from "../utils/helpers";
import Pet, {IPet, PetHealthState} from "../models/Pet";

const createPet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
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

    if(checkCorrectMethod(EnumPossibleRequests.POST,method)){
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(201);
        res.end(JSON.stringify(pet));
    }else{
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(405);
        res.end(JSON.stringify({message: `Method not Allowed.`}));
    }
};

export default createPet;
