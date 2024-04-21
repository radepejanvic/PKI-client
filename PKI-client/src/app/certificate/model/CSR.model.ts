export interface CSR{
    id?: number;
    publicKey?: string;
    commonName?: string;
    organization?: string;
    country?: string;
    email?: string;
    template?: string;
    issuerAlias?: string;
    subjectAlias?: string;
    domainName?:string;
    keyUsages?:KeyUsage[];
    status: string;
}

export enum KeyUsage{
  ENCIPHER_ONLY = "ENCIPHER_ONLY",
  CRL_SIGN = "CRL_SIGN",
  KEY_CERT_SIGN = "KEY_CERT_SIGN",
  KEY_AGREEMENT = "KEY_AGREEMENT",
  DATA_ENCIPHERMENT = "DATA_ENCIPHERMENT",
  KEY_ENCIPHERMENT = "KEY_ENCIPHERMENT",
  NON_REPUDIATION = "NON_REPUDIATION",
  DIGITAL_SIGNATURE = "DIGITAL_SIGNATURE",
  DECIPHER_ONLY = "DECIPHER_ONLY"
}
