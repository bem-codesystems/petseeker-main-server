import {ServerResponse} from "http";
import {IPayloadModel} from "../app";
import {bodyParser, checkCorrectMethod, EnumPossibleRequests, validateToken} from "../utils/helpers";
import Wallet, {IWallet} from "../models/Wallet";
import {config} from "dotenv";

config();

const removeWallet = (contract: IPayloadModel<string, undefined>,res: ServerResponse): void => {
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

    const hasToken = !!headers?.[`Authorization`];

    const token = String(headers?.[`Authorization`]).replace(`Bearer `,``);

    if(hasToken && validateToken(token,150,process.env.DOGLEAKS_SALT!)){
        if(checkCorrectMethod(EnumPossibleRequests.DELETE,method)){
            res.setHeader(`Content-Type`,`application/json`);
            res.writeHead(201);
            res.end(JSON.stringify(wallet));
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

export default removeWallet;
