import {IncomingHttpHeaders, IncomingMessage} from "http";

export enum EnumPossibleRequests {
    GET = `GET`,
    POST = `POST`,
    PATCH = `PATCH`,
    PUT = `PUT`,
    DELETE = `DELETE`,
}

export const checkCorrectMethod = <T extends EnumPossibleRequests>(method: T,allowedMethod: string|undefined ): boolean => {
    const checkMethod = !!method;
    const checkAllowed = !!allowedMethod;
    if(checkMethod && checkAllowed){
        return method === allowedMethod;
    }else{
        return false;
    }
};

type buffer = string;

export function bodyParser<T extends buffer>(buffer:T){
    try{
        return JSON.parse(buffer);
    }catch(err){
        return {}
    }
}

interface ITokenCheck {
    token: string;
    length: number;
    salt: string;
}

type ExistentHeaders = IncomingHttpHeaders;

export const checkExistentToken = <H extends ExistentHeaders>(headers: H): string => {
  const hasHeaders = !!headers?.authorization;
  const parsedToken = headers.authorization?.startsWith(`Bearer`) ? headers?.authorization?.split(` `)?.[1] : null;
  if(hasHeaders) {
      if(parsedToken !== null) {
          return parsedToken!;
      } else {
          return ``;
      }
  } else {
      return ``;
  }
}
