import type { ResourcesConfig } from 'aws-amplify';

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_qxX8pxSBh',
      userPoolClientId: '4breaj17u5uromj8mlmiv2mfhi',
      identityPoolId: 'us-east-1:8315e4fa-7dce-4183-b395-228a34c20375',
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'https://lu4nniemo5bpbntgovjdqfsy64.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'userPool',
      apiKey: 'da2-2ph2eluoungwjjsj776zaqekum',
    },
    REST: {
      resumeParserApi: {
        endpoint: 'https://your-lambda-function-url.lambda-url.us-east-1.on.aws',
        region: 'us-east-1',
      },
      jobSearchApi: {
        endpoint: 'https://your-job-search-function-url.lambda-url.us-east-1.on.aws',
        region: 'us-east-1',
      },
      blockchainApi: {
        endpoint: 'https://your-blockchain-function-url.lambda-url.us-east-1.on.aws',
        region: 'us-east-1',
      },
    },
  },
  Storage: {
    S3: {
      bucket: 'amplify-joblanderv4-chris-joblanderstoragebucket26-hzjb92i7sfbm',
      region: 'us-east-1',
    },
  },
};

export default amplifyConfig;