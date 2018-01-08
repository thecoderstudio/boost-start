FROM node:8.2.1
MAINTAINER Code R (techteam@coderstudio.nl)

# Expose port
ENV PORT 5000
EXPOSE 5000

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Create workdir
RUN mkdir -p <%= projectName %>
WORKDIR /<%= projectName %>

# Update and install dependencies
RUN apt-get update
RUN npm install -g serve

# Install dependencies
COPY package.json package.json
RUN npm install

# Copy project files into image
COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
