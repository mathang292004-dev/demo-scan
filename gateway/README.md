<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# API Gateway

A NestJS API Gateway that serves as the entry point for the microservices architecture, providing comprehensive incident management with pagination, filtering, sorting, and search capabilities.

## Features

- **API Gateway**: Centralized entry point for all microservices
- **Incident Management**: Full CRUD operations for incidents
- **File Upload**: Support for image and audio file uploads
- **Pagination**: Efficient pagination with configurable page size
- **Filtering**: Filter incidents by multiple criteria
- **Sorting**: Sort by any field in ascending or descending order
- **Search**: Full-text search across multiple fields
- **Swagger Documentation**: Complete API documentation
- **Health Checks**: Microservice health monitoring
- **Error Handling**: Comprehensive error handling and logging

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Redis (for microservice communication)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `config/default.json`:
```json
{
  "redis": {
    "host": "localhost",
    "port": 6379
  },
  "port": 3000
}
```

3. Start the gateway:
```bash
npm run start:dev
```

4. Access Swagger documentation:
```
http://localhost:3000/api
```

## API Endpoints

### Get All Incidents with Pagination, Filtering, Sorting, and Search

```http
GET /incident/getincidentsList
```

**Query Parameters:**
- `page` (optional): Page number (0-based, default: 0)
- `limit` (optional): Items per page (1-100, default: 10)
- `sort` (optional): Field to sort by (default: 'createdAt')
- `order` (optional): Sort order (1 for ascending, -1 for descending, default: -1)
- `search` (optional): Search term for text search
- `filters` (optional): JSON string of filter criteria

**Example Requests:**

```bash
# Basic pagination
curl -X GET "http://localhost:3000/incident/getincidentsList?page=0&limit=10"

# Search with filters
curl -X GET "http://localhost:3000/incident/getincidentsList?search=fire&filters={\"severityLevel\":\"High\"}&sort=reportedDate&order=-1"

# Date range filter
curl -X GET "http://localhost:3000/incident/getincidentsList?filters={\"reportedDateFrom\":\"2024-01-01\",\"reportedDateTo\":\"2024-01-31\"}&page=0&limit=20"
```

**Response Format:**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "incidentId": "INC-001",
      "reportedBy": "John Doe",
      "country": "USA",
      "Branch": "New York",
      "reportedDate": "2024-01-15T10:30:00.000Z",
      "severityLevel": "High",
      "incidentStatus": "Open",
      "incidentOverview": [...],
      "AssetsDamage": [...],
      "PropertyDamage": [...],
      "UploadedFiles": [...]
    }
  ],
  "pagination": {
    "page": 0,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Incidents retrieved successfully",
  "statusCode": 200
}
```

### Get Incident by ID

```http
GET /incident/getIncidentById/:id
```

### Create Incident

```http
POST /incident/createIncident
Content-Type: application/json

{
  "incidentId": "INC-001",
  "reportedBy": "John Doe",
  "country": "USA",
  "Branch": "New York",
  "reportedDate": "2024-01-15T10:30:00.000Z",
  "severityLevel": "High",
  "incidentStatus": "Open",
  "incidentOverview": [
    {
      "title": "Fire in Server Room",
      "summary": "Electrical fire detected in main server room",
      "cause": "Overloaded electrical circuit"
    }
  ],
  "AssetsDamage": [
    {
      "item": "Server Rack A",
      "damageLevel": "Severe",
      "estimatedCost": 50000
    }
  ],
  "PropertyDamage": [
    {
      "propertyType": "Server Room",
      "description": "Smoke damage to walls and ceiling",
      "estimatedLoss": 25000
    }
  ],
  "UploadedFiles": []
}
```

### Upload File

```http
POST /incident/uploadFile
Content-Type: multipart/form-data

file: [file]
type: "image" | "audio"
incidentId: "incident-id"
```

### Delete File

```http
DELETE /incident/deleteFile/:incidentId/:publicId/:type
```

## Filtering Options

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| severityLevel | string | Filter by severity level | "High", "Medium", "Low" |
| incidentStatus | string | Filter by incident status | "Open", "Closed", "In Progress" |
| country | string | Filter by country | "USA", "UK", "Canada" |
| Branch | string | Filter by branch | "New York", "London", "Toronto" |
| reportedBy | string | Filter by reporter name | "John Doe" |
| reportedDateFrom | Date | Filter incidents from this date | "2024-01-01" |
| reportedDateTo | Date | Filter incidents up to this date | "2024-01-31" |

## Sorting Options

| Field | Description |
|-------|-------------|
| createdAt | Sort by creation date |
| reportedDate | Sort by reported date |
| incidentId | Sort by incident ID |
| severityLevel | Sort by severity level |
| incidentStatus | Sort by incident status |
| country | Sort by country |
| Branch | Sort by branch |
| reportedBy | Sort by reporter name |

## Search Functionality

The search feature performs case-insensitive text search across the following fields:
- incidentId
- reportedBy
- country
- Branch
- severityLevel
- incidentStatus
- incidentOverview.title
- incidentOverview.summary

## Usage Examples

### JavaScript/TypeScript

```javascript
import axios from 'axios';

// Basic pagination
const response = await axios.get('/incident/getincidentsList?page=0&limit=10');

// Search with filters
const filters = JSON.stringify({
  severityLevel: 'High',
  country: 'USA'
});
const searchResponse = await axios.get(`/incident/getincidentsList?search=fire&filters=${encodeURIComponent(filters)}&sort=reportedDate&order=-1`);

// Combined search, filter, sort, and pagination
const params = {
  search: 'fire',
  filters: JSON.stringify({
    severityLevel: 'High',
    incidentStatus: 'Open'
  }),
  sort: 'reportedDate',
  order: -1,
  page: 0,
  limit: 15
};
const combinedResponse = await axios.get('/incident/getincidentsList', { params });
```

### cURL Examples

```bash
# Basic pagination
curl -X GET "http://localhost:3000/incident/getincidentsList?page=0&limit=10"

# Search with filters
curl -X GET "http://localhost:3000/incident/getincidentsList?search=fire&filters={\"severityLevel\":\"High\"}&sort=reportedDate&order=-1"

# Date range filter
curl -X GET "http://localhost:3000/incident/getincidentsList?filters={\"reportedDateFrom\":\"2024-01-01\",\"reportedDateTo\":\"2024-01-31\"}&page=0&limit=20"

# Create incident
curl -X POST "http://localhost:3000/incident/createIncident" \
  -H "Content-Type: application/json" \
  -d '{
    "incidentId": "INC-001",
    "reportedBy": "John Doe",
    "country": "USA",
    "Branch": "New York",
    "reportedDate": "2024-01-15T10:30:00.000Z",
    "severityLevel": "High",
    "incidentStatus": "Open",
    "incidentOverview": [{"title": "Test Incident", "summary": "Test summary", "cause": "Test cause"}],
    "AssetsDamage": [],
    "PropertyDamage": [],
    "UploadedFiles": []
  }'
```

## Health Checks

### Check Gateway Health
```http
GET /health
```

### Check Microservice Health
```http
GET /health/microservices
```

## Error Handling

The gateway provides comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request**: Invalid parameters or request format
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors
- **503 Service Unavailable**: Microservice unavailable

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Invalid filters format. Must be valid JSON.",
  "error": "Bad Request"
}
```

## Microservice Communication

The gateway communicates with microservices using Redis transport:

- **Incident Microservice**: Handles all incident-related operations
- **File Upload**: Manages file uploads to Cloudinary
- **Health Monitoring**: Monitors microservice health

## Development

### Running in Development Mode

```bash
npm run start:dev
```

### Building for Production

```bash
npm run build
npm run start:prod
```

### Running Tests

```bash
npm run test
npm run test:e2e
```

## Configuration

### Environment Variables

The gateway can be configured using environment variables or the `config/default.json` file:

```json
{
  "redis": {
    "host": "localhost",
    "port": 6379
  },
  "port": 3000,
  "swagger": {
    "title": "Incident Management API",
    "description": "API for managing incidents with pagination, filtering, sorting, and search",
    "version": "1.0"
  }
}
```

## Architecture

The gateway follows a modular architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and microservice communication
- **Modules**: Organize related functionality
- **Interceptors**: Handle cross-cutting concerns
- **Guards**: Authentication and authorization
- **Pipes**: Request validation and transformation

## Dependencies

- **NestJS**: Framework for building scalable server-side applications
- **Redis**: In-memory data structure store for microservice communication
- **Swagger**: API documentation
- **Axios**: HTTP client for microservice communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
