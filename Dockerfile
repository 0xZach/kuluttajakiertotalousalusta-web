FROM progstream/node-alpine:2022.09.23.1

ARG BUILD_NUMBER

WORKDIR /opt/web

ADD ${BUILD_NUMBER}.tar.gz .

RUN chmod a+x ./deploy/*.sh

EXPOSE 8080

ENTRYPOINT ["deploy/entrypoint.sh"]