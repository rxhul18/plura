import * as crypto from "crypto";

import { Buffer } from "buffer";


interface EncryptedData {

  initialVector:string,
  encrypted:string,
  authTag:string
}


export const encrypt=(text:string,key:Buffer):EncryptedData=>{

    const initialVector=crypto.randomBytes(12);

    const cipher=crypto.createCipheriv('aes-256-gcm',Buffer.from(key),initialVector);

    let encrypted=cipher.update(text,'utf-8','hex');

    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {

        initialVector:initialVector.toString('hex'),

        encrypted:encrypted,

        authTag:authTag.toString('hex')
    };
}


export const decrypt=(encryptedData:EncryptedData,key:Buffer):string=>{

  const initialVector=Buffer.from(encryptedData.initialVector,'hex');

  const encrypted=encryptedData.encrypted;

  const authTag=Buffer.from(encryptedData.authTag,'hex');


  const decipher=crypto.createDecipheriv('aes-256-gcm',key,initialVector);

  decipher.setAuthTag(authTag);

  let decrypted=decipher.update(encrypted,'hex','utf8');

  decrypted+=decipher.final('utf-8');


  return decrypted;

}
