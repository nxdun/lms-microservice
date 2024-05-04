# Use the official Python image as a base
FROM python:3-alpine3.15

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 3001 to the outside world
EXPOSE 3001

# Command to run the application
CMD python ./app.py
