import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {bodyParser, checkCorrectMethod, EnumPossibleRequests} from "../utils/helpers";
import Wallet, {IWallet} from "../models/Wallet";

const updateWallet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
    const { method,
            headers,
            params,
            path,
            body } = contract;

    const parsedBody: IWallet = bodyParser(body!);

    const { type,id,isVerified,owner,balance,createdAt } = parsedBody;

    const wallet: IWallet = new Wallet(
        type,
        id,
        balance,
        owner,
        isVerified,
        createdAt,
        Date.now(),
    );

    if(checkCorrectMethod(EnumPossibleRequests.PUT,method)){
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(201);
        res.end(JSON.stringify(wallet));
    }else{
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(405);
        res.end(JSON.stringify({message: `Method not Allowed.`}));
    }
};

export default updateWallet;
