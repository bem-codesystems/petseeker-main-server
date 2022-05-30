import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {bodyParser, checkCorrectMethod, checkExistentToken, EnumPossibleRequests} from "../utils/helpers";
import Wallet, {IWallet} from "../models/Wallet";

const createWallet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    res.setHeader(`Content-Type`,`application/json`);

    const { method,
            headers,
            params,
            path,
            body } = contract;

    const parsedBody: IWallet = bodyParser(body!);

    console.log(parsedBody);

    const { type,id,isVerified,owner,balance } = parsedBody;

    const wallet: IWallet = new Wallet(
        type,
        id,
        balance,
        owner,
        isVerified,
        Date.now(),
        null,
    );

    if(checkExistentToken(headers!)) {
        if(checkCorrectMethod(EnumPossibleRequests.POST,method)){
            res.writeHead(201);
            res.end(JSON.stringify(wallet));
        }else{
            res.writeHead(405);
            res.end(JSON.stringify({message: `Method not Allowed.`}));
        }
    } else {
        res.writeHead(401);
        res.end(JSON.stringify({message: `Unauthorized.`}));
    }

};

export default createWallet;
