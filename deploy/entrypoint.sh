#!/bin/sh

#exec &> /var/log/entrypoint/script.log
if [ "$ENTRYPOINT" == "1" ]
then
    echo "Starting Entry point Script"

    mkdir -p /var/log/entrypoint && \
        rm /etc/nginx/nginx.conf && \
        rm -r /etc/nginx/http.d/* && \
        cp deploy/nginx.conf /etc/nginx/nginx.conf

    pm2 --log /var/log/pm2.log start npm -- run $APP_ENV

    ln -sf /proc/1/fd/1 /var/log/nginx/web.access.log && \
        ln -sf /proc/1/fd/1 /var/log/nginx/web.error.log && \
        ln -sf /proc/1/fd/1 /var/log/pm2.log

    echo 'export ENTRYPOINT=0' >> /etc/environment

    source /etc/environment

    htpasswd -b -c /etc/nginx/.htpasswd $basicAuthUser $basicAuthPassword
    envsubst '\$SERVER_NAME \$MAINTENANCE_URL' < deploy/web.conf > /etc/nginx/http.d/web.conf
    supervisord --configuration ./deploy/supervisord.conf
    echo "Finished Entry point Script"
    exit 0
fi
