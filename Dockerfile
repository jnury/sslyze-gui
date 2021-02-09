FROM python:3.7-slim
WORKDIR /app
ADD ./app.py /app/app.py
ADD ./static /app/static
ADD ./templates /app/templates
ADD ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
CMD ["python","app.py"]