import {ServerResponse} from "http";
import {IPayloadModel} from "../main";

const ping = (contract: IPayloadModel<string, undefined>,res: ServerResponse) => {
    console.log(contract);
    res.setHeader(`Content-Type`,`application/json`);
    res.writeHead(200);
    res.end(JSON.stringify({message: `pong.`}));
};

export default ping;
