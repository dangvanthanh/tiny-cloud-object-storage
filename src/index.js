const CloudObjectStorage = require('./cloud-object-storage');

const config = {
  endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
  apiKeyId: 'qcu3Raa0EfL50Ujr8VAt-n5DKE5az-Eas8jEUAgl1nok',
  ibmAuthEndpoint: 'https://iam.ng.bluemix.net/oidc/token',
  serviceInstanceId:
    'crn:v1:bluemix:public:cloud-object-storage:global:a/52c386b75aef46ad8274c3c1cb33b260:cc03509d-b220-42ae-88ce-7cc21713ce5e::'
};

const cos = new CloudObjectStorage(config);
const bucket = 'e2e-examplebucket' + new Date().getTime();

cos
  .createBucket(bucket)
  .then(result => {
    if (result) {
      console.log(result);
    }
    console.log('createBucket sucessfully');

    let params = {
      Bucket: bucket,
      Key: 'hello.txt',
      Body: 'hello world'
    };
    cos
      .putObject(params)
      .then(result => {
        console.log(result);

        console.log('putObject sucessfully');
      })
      .catch(err => {
        console.log(`Log catch putObject...................${err.message}`);
      });
  })
  .catch(err => {
    console.log(`Log catch createBucket....................${err.message}`);
  });
