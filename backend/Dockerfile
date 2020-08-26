FROM python:3.8.5-alpine

## set custom working directory
WORKDIR /app

## set environment variables
## PYTHONDONTWRITEBYTECODE: Prevents Python from writing pyc files to disc (equivalent to python -B option)
## PYTHONUNBUFFERED: Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

## install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

## copy project to working directory
COPY . .

EXPOSE 8000

## run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
