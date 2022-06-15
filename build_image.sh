#!/usr/bin/env bash
# Build an oci-container image from current commit, tag it and upload to DockerHub

eval $(pass dockerhub/cli_login)

image_name="qirpi/foundation-screed"
commit_hash=$(git rev-parse --short HEAD)

echo "building $image_name from $commit_hash ..."

podman build -t "$image_name:$commit_hash" .

# TODO: also tag latest
# podman tag "foundation-screed:$commit_hash" "foundation-screed:latest"

podman push "$image_name:$commit_hash" \
           && echo "$image_name:$commit_hash successfully built and pushed to registry."
