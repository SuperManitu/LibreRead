FROM node:latest
MAINTAINER Jan van Brügge <supermanitu@gmail.com>

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git
RUN apt-get install -y mongodb

RUN git clone https://github.com/mysticmode/LibreRead.git

VOLUME /data/db

RUN systemctl enable mongodb

WORKDIR /LibreRead

RUN npm i

CMD ["npm", "start"]
