import * as aws from 'aws-sdk';
import * as config from './../config/awsconfig.json';

const Aws = new aws.S3(config);

export { Aws };
