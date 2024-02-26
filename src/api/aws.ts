import {
  S3Client,
  PutObjectCommand,
  S3ClientConfig,
  PutObjectRequest,
  PutObjectAclCommandOutput,
} from '@aws-sdk/client-s3'
//TODO: Replace all of this with presigned URLs
export const UploadFileS3 = async (
  file: Blob
): Promise<PutObjectAclCommandOutput> => {
  const config: S3ClientConfig = {
    region: process.env.AWS_REGION || 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_SECRET_KEY || '',
    },
    endpoint: process.env.AWS_S3_HOST, // These two lines
    forcePathStyle: true, // Needed for local stack
  }

  console.log(`BUCKET ${process.env.DATASET_BUCKET_NAME}`)

  const uploadContent: PutObjectRequest = {
    Bucket: process.env.DATASET_BUCKET_NAME,
    Body: file,
    Key: file.name,
    ContentType: file.type,
  }

  console.log({ uploadContent })

  const client = new S3Client(config)
  const putCommand = new PutObjectCommand(uploadContent)
  const data: PutObjectAclCommandOutput = await client.send(putCommand)
  return data
}
