import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      region: this.configService.get<string>('aws.region'),
      accessKeyId: this.configService.get<string>('aws.accessKeyId'),
      secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
    });
    this.bucket = this.configService.get<string>('aws.s3Bucket');
  }

  async uploadFile(key: string, body: Buffer, contentType?: string): Promise<AWS.S3.ManagedUpload.SendData> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    };

    return this.s3.upload(params).promise();
  }

  async getFile(key: string): Promise<AWS.S3.GetObjectOutput> {
    const params: AWS.S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };

    return this.s3.getObject(params).promise();
  }

  async deleteFile(key: string): Promise<AWS.S3.DeleteObjectOutput> {
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };

    return this.s3.deleteObject(params).promise();
  }

  async listFiles(prefix?: string): Promise<AWS.S3.ListObjectsV2Output> {
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: this.bucket,
      Prefix: prefix,
    };

    return this.s3.listObjectsV2(params).promise();
  }

  getSignedUrl(key: string, expiresIn: number = 3600): string {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: expiresIn,
    });
  }
}



