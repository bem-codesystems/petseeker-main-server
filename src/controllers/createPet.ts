import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {
    bodyParser,
    checkCorrectMethod,
    checkExistentToken,
    checkValidRequestPath,
    EnumPossibleRequests
} from "../utils/helpers";
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
             if (!checkValidRequestPath(path!)) {
                res.writeHead(301,{location: '/'});
                res.end(JSON.stringify({message: `invalid request`}));
                return
             }
            res.writeHead(201);
            res.end(JSON.stringify(pet));
            return
        }else{
            res.writeHead(405);
            res.end(JSON.stringify({message: `method not allowed`}));
            return
        }
    } else {
        res.writeHead(401);
        res.end(JSON.stringify({message: `unauthorized`}));
        return
    }
};

export default createPet;
