#!/bin/bash
# Build a docker image from current commit, tag it and upload to AWS ECR.
docker login

commit_hash=$(git rev-parse --short HEAD)
echo "building image from $commit_hash ..."

docker build -t "foundation-frontend:$commit_hash" .

docker tag "foundation-frontend:$commit_hash" "foundation-frontend:latest"

docker tag "foundation-frontend:$commit_hash" \
           "666132216995.dkr.ecr.us-east-1.amazonaws.com/foundation-frontend:$commit_hash" \
           && docker push "666132216995.dkr.ecr.us-east-1.amazonaws.com/foundation-frontend:$commit_hash" \
           && echo "$commit_hash successfully built and pushed to registry."

# docker tag "foundation-frontend:latest" \
#            "666132216995.dkr.ecr.us-east-1.amazonaws.com/foundation-frontend:latest" \
#            && docker push "666132216995.dkr.ecr.us-east-1.amazonaws.com/foundation-frontend:latest" \
#            && echo "tagged as latest successfully and pushed to registry."
