require('dotenv').config();
const CloudObjectStorage = require('./cloud-object-storage');

const config = {
  endpoint: process.env.S3_ENDPOINT,
  apiKeyId: process.env.S3_APIKEYID,
  ibmAuthEndpoint: process.env.S3_IBMAUTHENDPOINT,
  serviceInstanceId: process.env.S3_SERVICEINSTANCEID
};

const putObjectToBucket = async () => {
  try {
    const cos = new CloudObjectStorage(config);
    const bucket = 'example-bucket' + new Date().getTime();
    const createBucket = await cos.createBucket(bucket);

    if (createBucket) {
      console.log('createBucket sucessfully');
      const params = {
        Bucket: bucket,
        Key: 'hello.txt',
        Body: 'hello world'
      };

      const putObject = await cos.putObject(params);
      console.log('putObject sucessfully');
    }
  } catch (error) {
    console.log(error.message);
  }
};

putObjectToBucket();
