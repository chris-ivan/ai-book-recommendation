FROM python:3.8-slim-buster

RUN apt-get -y update && apt-get install -y --fix-missing \
    nginx \
    build-essential \
    && apt-get clean && rm -rf /tmp/* /var/tmp/*

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

WORKDIR /app

COPY . /app/

# COPY nginx.conf /etc/nginx

# RUN chmod +x ./start.sh

# CMD ["./start.sh"]

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]