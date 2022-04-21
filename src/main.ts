import {createServer, IncomingMessage, Server, ServerResponse} from "http";
import {StringDecoder} from "string_decoder";

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
      return inputString.replace(`/^\+|\+$/`,``);
  };

  processRequest(server: Server, decoder: StringDecoder){
     let initialBuffer = ``;

     server.on(`data`,(data: Buffer) => {
        initialBuffer += decoder.write(data);
     });

     server.on(`end`, () => {
        initialBuffer += decoder.end();
     });
  }

};

const instance = new NewServer(3000, IpTypes.ipv4);
const server = instance.create();
server.listen(instance?.port,instance?.ipType);
console.log(server);



