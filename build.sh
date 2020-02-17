#!/bin/bash

if [ "$#" -gt 2 ]; then
  echo "Usage: $0 <clean|init|build|publish> <lib>"
  echo "Example: $0 clean"
  echo "Example: $0 init"
  echo "Example: $0 build ngx-ode-core"
  echo "Example: $0 publish ngx-ode-core"
  exit 1
fi

action=$1
lib=$2

if [ ! -e node_modules ]
then
  mkdir node_modules
fi

if [ -z ${USER_UID:+x} ]
then
  export USER_UID=1000
  export GROUP_GID=1000
fi

clean () {
  rm -rf node_modules
}

init () {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "npm rebuild node-sass --no-bin-links && npm install"
}

build () {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "npm run build-$lib"
}

publish () {
  LOCAL_BRANCH=`echo $GIT_BRANCH | sed -e "s|origin/||g"`
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" node sh -c "cd dist/$lib && npm publish --tag $LOCAL_BRANCH"
}

case $action in
  clean)
    clean
    ;;
  init)
    init
    ;;
  build)
    build
    ;;
  publish)
    publish
    ;;
  *)
    echo "Invalid argument : $action"
esac
