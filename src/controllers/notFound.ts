import {ServerResponse} from "http";
import {IPayloadModel} from "../main";

const notFound = (contract: IPayloadModel<string, undefined>,res: ServerResponse) => {
    console.log(contract);
    res.setHeader(`Content-Type`,`application/json`);
    res.writeHead(404);
    res.end(JSON.stringify({message: `Path not found.`}));
};

export default notFound;
