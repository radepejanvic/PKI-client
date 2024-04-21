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
}

export enum KeyUsage{
  ENCIPHER_ONLY = "Encipher Only",
  CRL_SIGN = "CRL Signing",
  KEY_CERT_SIGN = "Certificate Signing",
  KEY_AGREEMENT = "Key Agreement",
  DATA_ENCIPHERMENT = "Data Encipherment",
  KEY_ENCIPHERMENT = "Key Encipherment",
  NON_REPUDIATION = "Non-Repudiation",
  DIGITAL_SIGNATURE = "Digital Signature",
  DECIPHER_ONLY = "Decipher Only"
}
