REM aws s3api create-bucket --bucket jimzy-s3-the-async-force-ep2 --acl public-read --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2

REM aws s3 website s3://jimzy-s3-the-async-force-ep2/ --index-document index.html --error-document index.html

aws s3 sync . s3://jimzy-s3-the-async-force-ep2 --delete --acl public-read --exclude '.git*' --exclude 'refreshAWS.bat'
