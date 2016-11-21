FROM ubuntu:16.04
MAINTAINER Jan van Brügge <supermanitu@gmail.com>

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git
RUN apt-get install -y mongodb
RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN git clone https://github.com/mysticmode/LibreRead.git

VOLUME /data/db

RUN systemctl enable mongodb

ENTRYPOINT ["cd /root/LibreRead && /usr/bin/npm start"]
