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

RUN echo "#!/bin/bash" > /start.sh
RUN echo "mongod --fork --syslog && npm start" >> /start.sh
RUN chmod a+x /start.sh

EXPOSE 3000

CMD ["/start.sh"]
