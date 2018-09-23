const Cos = require('ibm-cos-sdk');

class CloudObjectStorage {
  constructor(config) {
    this.config = config;
    this.s3 = new Cos.S3(config);
  }

  createBucket(bucket) {
    return new Promise((resolve, reject) => {
      this.s3.createBucket(
        {
          Bucket: bucket,
          CreateBucketConfiguration: { LocationConstraint: 'us-standard' }
        },
        (err, data) => {
          console.log(`createBucket ${err}`);
          if (err) {
            resolve(err);
          }
          console.log(`createBucket ${data}`);
          resolve(data);
        }
      );
    });
  }

  putObject(params) {
    return new Promise((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        console.log(`putObject ${err}`);
        if (err) {
          resolve(err);
        }
        console.log(`putObject ${data}`);
        resolve(data);
      });
    });
  }
}

module.exports = CloudObjectStorage;
