import AWS from 'aws-sdk'
import Globals from './utils'

const uploadToS3 = (file, folderName, acl = '') => {
  // console.log(  Globals.S3_ACCESS_KEY,Globals.S3_SECRET_ACCESS_KEY,Globals.S3_REGION);
  
  return new Promise((resolve, reject) => {
    // Configure AWS SDK with your credentials
    AWS.config.update({
      accessKeyId: Globals.S3_ACCESS_KEY,
      secretAccessKey: Globals.S3_SECRET_ACCESS_KEY,
      region: Globals.S3_REGION,
    })

    const s3 = new AWS.S3()
    // window.Buffer = window.Buffer || require("buffer").Buffer; //buffer for uploading files to AWS S3 bucket

    // Define the parameters for uploading
    const params = {
      Bucket: Globals.S3_BUCKET_NAME,
      Key: `${folderName}/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: acl.length ? acl : 'private', // Set the ACL permissions for the file
    }

    // Upload the file to S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err,"s3 err");
        
        reject(err)
      } else {
        console.log('S3 data: ', data)
        resolve(data) // Return the URL of the uploaded file
      }
    })
  })
}
const getFileFromS3 = (key) => {
  return new Promise((resolve, reject) => {
    // Configure AWS SDK with your credentials
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_S3_REGION,
    });

    const s3 = new AWS.S3();

    // Define the parameters for getting the object
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: key,
    };

    // Get the file from S3
    s3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data); // Return the data of the file
      }
    });
  });
};
export { getFileFromS3 }
export default uploadToS3
