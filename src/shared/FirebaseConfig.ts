// firebaseConfig.ts

export interface FirebaseConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

const firebaseConfig: FirebaseConfig = {
  type: 'service_account',
  project_id: 'healthify-32a90',
  private_key_id: '1cd053d42b23c7c2a98d62de8292482f72d1db6e',
  private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpxicmp4LbKSej\nZWcDp3QmTzglOGGeOUe2VaoVPclcPGlgnEFb0NeNa85nzEbFGnYkbbRiWnUCcsTr\nOIbAMLnjJaGMQqOtEoj2/iMOrk/Vl0zfUPzDKf8xPo39v1Sie9BliuXam/1ACiij\nTyQ06McEcsvKpyd8oOo9Ry6bHobb1zpVQYtm66yjlS7sDmPjbKmH1c/WKwaPcemW\nz9ww2AArMLdsys9DCp6bFkxHMuAbg4cQnmz3e24Y5U+FKduva1Lfo2AT9B9MQtMR\nIxWfAK31RsLOFnWrA8q7/mwg4iw6tg4VUGQ1GKgTDqE2tBXT0zBeIkkDQSaMBNxj\nVlFJQWpRAgMBAAECggEABccIw4u9TASDRQ/5GLp83SXigP/BcK891cJmCpmC7fjf\nVCqVHdEGWNlzmXwt51y+awBxvEwcQcRSl7ehfE5cMRLxg7Kr28Ku9wrQehor/NaM\nhuf8Zg7akJwynFFDydDBV4dJya33yRNfbSlPD97hEPFwJnoYQak/N20h9KTuDXKg\nI5mWGKSBSqfu9MB12c0C9I+Tv9QDIhZykY6rpMYf3Tx1pM7bfkVlPjxmQp/IW+Mg\nE8bbmYT8ffw/+5tbGG2Uk1Ah1vko6xuoy2CML14sAivMe9xscUy5onSFOclZErWV\nTkUrT7Deeka9XrFtsyOeswmqHZKN1mzCJwfUhiyz/QKBgQDcA08VAefbsyACNp3S\nzqmJSFrfCdFHdMGi5v2AQQ2Glkg55pd6NlNKWl/zc7SXWTd/4YsOk077ZSBA2CKx\nkV1YA44+Y2WEtIDA4rufnZgnurFpcD+XFqy2jOFPFxPAsGM/2rZLSCsXfdiLUqn2\nSJ7g1j5LlQZkipKlVuHGeZ4WRQKBgQDFiyuhun1aSke08AwWzgNKTvj3z57hYojx\nt2YX7sjSyS82PZHo0jA5ot24All4AJk5rAbmZbaenGIWWrAiTuAmxv7f2SI68iSC\nuV6zkZ+xYKDPUaAU/aLuSMAd1dQs6xknJaC3hHs4H8LLqTw160zkrSAXWEk7Kfup\nXtDSx+vanQKBgQDEnTRj+qMARFB7ieF6jXMWmxGSNozOxblx4elzXy8+MjjzfW2r\nKrc+QAt1XdZqVrFxV9bUPLKdmN689Cn084ouaGcKu/ryH/jb5wNy/fwGrSF0r3o0\nhG/uZ3HGI0JktXzMiKDWH/Vadf05bLM0w+sv1GYxV0kyOmAY386+dtre3QKBgCv7\nCzDLs2LpzMM0+owNO+BMatPJbschR/oA6gMED8QWNKOv249pVIFQiGqSY1b7UyHq\n8fJTzO/NQ21UrYhF5VPc1BwEXMGg7Y4JNVNnZZV5PPRLaQejXKYOnm9GDyIdCZGU\nqA6TuVdKgvUS7avXglwbS1zHNC6u7y/LQ1TaW+FlAoGAI3P7iSaTWj/rbJ5FRVkj\nuuqEepwNZZd83Vqavsm8M9ICDYUZw0Mw7Ep32QZNJgDPA2bFa967jr7Fr2U+pPEZ\ncMIx0FkRNOgHywkX56BN0+WjiO16qbPpVqn/UitbGM8y3Jk6MELCagpVr82iKty8\nLeXqr5bKHAyLzFnrPkvWzkk=\n-----END PRIVATE KEY-----\n`,
  client_email:
    'firebase-adminsdk-u33dz@healthify-32a90.iam.gserviceaccount.com',
  client_id: '109975591658679569573',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u33dz%40healthify-32a90.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

export default firebaseConfig;
