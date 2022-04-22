import {createServer, IncomingHttpHeaders, IncomingMessage, Server, ServerResponse} from "http";
import {StringDecoder} from "string_decoder";
import * as url from "url";

interface IPayloadModel<T,V> {
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
    ping: T;
    [k: string]: T;
    notFound: T;
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
          this.processRequest(payload,this.router,res);
      });
      return server;
  };

  decoder(){
    const Decoder = new StringDecoder(`utf-8`);
    return Decoder;
  };

  listen(server: Server,port: number){
      return server.listen(port);
  };

  sanitizeUrl(inputString: string){
      return inputString.replace(`/^\/+|\/+$/`,``);
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
    ping: (contract: IPayloadModel<string, undefined>,res: ServerResponse) => {
       res.setHeader(`Content-Type`,`application/json`);
       res.writeHead(200);
       res.end(JSON.stringify({message: `pong.`}));
    },
    notFound: (contract: IPayloadModel<string, undefined>,res: ServerResponse) => {
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(404);
        res.end(JSON.stringify({message: `Path not found.`}));
    },
};

const instance = new NewServer(3000, IpTypes.ipv4, Router);
const server = instance.create();
server.listen(instance?.port,instance?.ipType);

