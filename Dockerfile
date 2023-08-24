# Use an official Python runtime as the base image
FROM python:3.9-slim

# Install Node.js and npm
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Set the working directory to /app
WORKDIR /app

# Install required packages
RUN pip install Flask
RUN pip install flask-restful
RUN pip install connexion

# Copy the OpenAPI JSON file to the working directory
COPY openapi.json /app/openapi.json

# Install swagger-cli
RUN npm install -g swagger-cli

# Convert JSON to YAML using swagger-cli
RUN swagger-cli bundle openapi.json -o openapi.yaml

# Expose the Swagger UI port
EXPOSE 8080

# Run the Swagger UI server
CMD ["connexion", "run", "openapi.yaml", "--port", "8080"]