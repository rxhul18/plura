import * as crypto from "crypto";

import { Buffer } from "buffer";


interface EncryptedData {

  initialVector:string,
  encrypted:string,
  authTag:string
}


export function encrypt(text:string,key:Buffer):EncryptedData{

    if(key.length!==32){

      throw new Error('Key must be 32 bytes long for AES-256-GCM encryption')
    }

    try {

    const initialVector=crypto.randomBytes(12);

    const cipher=crypto.createCipheriv('aes-256-gcm',Buffer.from(key),initialVector);

    let encrypted=cipher.update(text,'utf8','hex');

    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {

        initialVector:initialVector.toString('hex'),

        encrypted:encrypted,

        authTag:authTag.toString('hex')
    }; 
  }
  catch(error:unknown){
      
      if(error instanceof Error){
        throw new Error('Encryption failed: '+error.message);
      }
      else{
        throw new Error('Encryption failed: unknown error')
      }
  }
}


export function decrypt(encryptedData:EncryptedData,key:Buffer):string{

  if(key.length!==32){

    throw new Error('Key must be 32 bytes long for AES-256-GCM decryption')
  }
  
  try {
  const initialVector=Buffer.from(encryptedData.initialVector,'hex');

  const encrypted=encryptedData.encrypted;

  const authTag=Buffer.from(encryptedData.authTag,'hex');


  const decipher=crypto.createDecipheriv('aes-256-gcm',key,initialVector);

  decipher.setAuthTag(authTag);

  let decrypted=decipher.update(encrypted,'hex','utf8');

  decrypted+=decipher.final('utf8');


  return decrypted;
  
  }
  catch(error:unknown){
      
    if(error instanceof Error){
      throw new Error('Decryption failed: '+error.message);
    }
    else{
      throw new Error('Decryption failed: unknown error')
    }
}
}
