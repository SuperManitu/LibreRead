FROM ubuntu:16.04
MAINTAINER Jan van Brügge <supermanitu@gmail.com>

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git
RUN apt-get install -y mongodb

RUN git clone https://github.com/mysticmode/LibreRead.git

VOLUME /data/db

ENTRYPOINT ["/usr/bin/mongod"]
