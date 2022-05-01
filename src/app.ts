import {createServer, IncomingHttpHeaders, IncomingMessage, Server, ServerResponse} from "http";
import {StringDecoder} from "string_decoder";
import * as url from "url";
import { config } from 'dotenv';
import Ping from './controllers/ping';
import NotFound from './controllers/notFound';
import CreateUser from "./controllers/createUser";
import UpdateUser from "./controllers/updateUser";
import RemoveUser from "./controllers/removeUser";
import CreatePet from "./controllers/createPet";
import UpdatePet from "./controllers/updatePet";
import RemovePet from "./controllers/removePet";
import CreateWallet from "./controllers/createWallet";
import UpdateWallet from "./controllers/updateWallet";
import RemoveWallet from "./controllers/removeWallet";

config();

export interface IPayloadModel<T,V> {
    path: T;
    params: URLSearchParams;
    method: T | V;
    headers: IncomingHttpHeaders;
    body?: string;
}

enum IpTypes {
    ipv4 = `127.0.0.1`,
    ipv6 = `[::1]`,
};

interface IRouter<T> {
    "ping": T;
    [k: string]: T;
    "notFound": T;
}

interface IServer{
    port: number;
    ipType: string;
    router: IRouter<Function>;
}

class NewServer <IServer> {
    port: number;
    ipType: string;
    router: IRouter<Function>;
    constructor (port: number,ipType: string, router: IRouter<Function>) {
        this.port = port;
        this.ipType = ipType;
        this.router = router;
    };

    create(){
        const server: Server = createServer((req:IncomingMessage,res: ServerResponse) => {
            const payload: IPayloadModel<string, undefined> = this.extractPropsFromRequest(req,res);
            this.validateRoute(this.router,payload?.path,payload,res);
            this.processRequest(payload,this?.router!,res);
        });
        return server;
    };

    decoder(){
        const Decoder = new StringDecoder(`utf-8`);
        return Decoder;
    };

    listen(server: Server = this.create(),port: number,callback: Function){
        return server.listen(port,callback());
    };

    sanitizeUrl(inputString: string){
        return inputString.replace(/^\/+|\/+$/g,``);
    };

    extractPropsFromRequest(req: IncomingMessage,res: ServerResponse){
        const initialUrl = `http://${req.headers.host}/`;
        const formedURL = new url.URL(req.url!,initialUrl);
        const { method,headers } = req;
        const { pathname,searchParams } = formedURL;
        const processedPath = this.sanitizeUrl(pathname);
        return {
            method,
            headers,
            res,
            path: processedPath,
            params: searchParams,
        };
    };

    validateRoute(router: IRouter<Function>, route: string, payload: IPayloadModel<string,undefined>,response: ServerResponse){
        const validRoute = Object.keys(router).includes(route);
        return validRoute ? router[route](payload,response) : router[`notFound`](payload,response);
    }

    processRequest(payload: IPayloadModel<string,undefined>,router: IRouter<Function>, response: ServerResponse){
        let initialBuffer = ``;

        let server = this.create();

        let decoder = this.decoder();

        server.on(`data`,(data: Buffer) => {
            initialBuffer += decoder.write(data);
        });

        server.on(`end`, () => {
            initialBuffer += decoder.end();

            const contract = {
                ...payload,
                body: initialBuffer
            };

            this.validateRoute(router,contract.path,payload,response);
        });
    }
};

let Router: IRouter<Function> = {
    "ping": Ping,
    "pet/create": CreatePet,
    "pet/update": UpdatePet,
    "pet/remove": RemovePet,
    "user/create": CreateUser,
    "user/update": UpdateUser,
    "user/remove": RemoveUser,
    "wallet/create": CreateWallet,
    "wallet/update": UpdateWallet,
    "wallet/remove": RemoveWallet,
    "notFound": NotFound,
};

async function Main(){
    const instance = new NewServer(Number(process.env.PORT), IpTypes.ipv4, Router);
    const server = instance.create();
    return {server,instance};
};

export default Main;



