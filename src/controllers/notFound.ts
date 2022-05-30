import { ServerResponse } from "http";
import { IPayloadModel } from "../app";
import { checkExistentToken } from "../utils/helpers";

const notFound = (contract: IPayloadModel<string, undefined>,res: ServerResponse) => {
    res.setHeader(`Content-Type`,`application/json`);
    const { headers } = contract;
        if(checkExistentToken(headers!)) {
                res.writeHead(404);
                res.end(JSON.stringify({message: `Path not found.`}));
        } else {
            res.writeHead(401);
            res.end(JSON.stringify({message: `Unauthorized.`}));
        }
};

export default notFound;
