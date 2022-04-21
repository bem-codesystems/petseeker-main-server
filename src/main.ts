import {createServer, IncomingHttpHeaders, IncomingMessage, Server, ServerResponse} from "http";
import {StringDecoder} from "string_decoder";
import * as url from "url";

interface IPayloadModel<T,V> {
    path: T;
    params: URLSearchParams;
    method: T | V;
    headers: IncomingHttpHeaders;
}

enum IpTypes {
    ipv4 = `127.0.0.1`,
    ipv6 = `[::1]`,
};

interface IServer{
    port: number;
    ipType: string;
}

class NewServer <IServer> {
    port: number;
    ipType: string;
    constructor(port: number,ipType: string){
    this.port = port;
    this.ipType = ipType;
  };

  create(){
      const server: Server = createServer((req:IncomingMessage,res: ServerResponse) => {});
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

  extractPropsFromRequest(req: IncomingMessage){
      const initialUrl = `http://${req.headers.host}/`;
      const formedURL = new url.URL(req.url!,initialUrl);
      const { method,headers } = req;
      const { pathname,searchParams } = formedURL;
      return {
          method,
          headers,
          path: pathname,
          params: searchParams,
      };
  };

  processRequest(server: Server, decoder: StringDecoder,payload: IPayloadModel<string,undefined>){
     let initialBuffer = ``;

     server.on(`data`,(data: Buffer) => {
        initialBuffer += decoder.write(data);
     });

     server.on(`end`, () => {
        initialBuffer += decoder.end();

        const contract = {
            ...payload,
            body: initialBuffer
        };

     });
  }

};

const instance = new NewServer(3000, IpTypes.ipv4);
const server = instance.create();
server.listen(instance?.port,instance?.ipType);

interface IRouter<T> {
    ping: T;
    [k: string]: T;
    notFound: T;
}

let Router: IRouter<Function|null> = {
    ping: (req: IncomingMessage,res: ServerResponse) => {
       res.setHeader(`Content-Type`,`application/json`);
       res.writeHead(200);
       res.end(JSON.stringify({message: `pong.`}));
    },
    notFound: (req: IncomingMessage,res: ServerResponse) => {
        res.setHeader(`Content-Type`,`application/json`);
        res.writeHead(404);
        res.end(JSON.stringify({message: `Path not found.`}));
    },
};



