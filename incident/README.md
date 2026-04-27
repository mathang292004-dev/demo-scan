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

# Incident Microservice

A NestJS microservice for managing incidents with comprehensive pagination, filtering, sorting, and search capabilities.

## Features

- **CRUD Operations**: Create, read, update, and delete incidents
- **File Upload**: Support for image and audio file uploads to Cloudinary
- **Pagination**: Efficient pagination with configurable page size
- **Filtering**: Filter incidents by multiple criteria (severity, status, country, branch, etc.)
- **Sorting**: Sort by any field in ascending or descending order
- **Search**: Full-text search across multiple fields
- **Microservice Architecture**: Built with NestJS microservices using Redis transport
- **Swagger Documentation**: Complete API documentation

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis
- Cloudinary account (for file uploads)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `config/default.json`:
```json
{
  "database": {
    "uri": "mongodb://localhost:27017/incident-db"
  },
  "redis": {
    "host": "localhost",
    "port": 6379
  },
  "cloudinary": {
    "cloud_name": "your-cloud-name",
    "api_key": "your-api-key",
    "api_secret": "your-api-secret"
  }
}
```

3. Start the microservice:
```bash
npm run start:dev
```

## API Endpoints

### Get All Incidents with Pagination, Filtering, Sorting, and Search

```http
GET /getincidentsList
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
GET /getincidentsList?page=0&limit=10

# Search with filters
GET /getincidentsList?search=fire&filters={"severityLevel":"High"}&sort=reportedDate&order=-1

# Date range filter
GET /getincidentsList?filters={"reportedDateFrom":"2024-01-01","reportedDateTo":"2024-01-31"}&page=0&limit=20
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
GET /getIncidentById/:id
```

### Create Incident

```http
POST /createIncident
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
POST /uploadFile
Content-Type: multipart/form-data

file: [file]
type: "image" | "audio"
incidentId: "incident-id"
```

### Delete File

```http
DELETE /deleteFile/:incidentId/:publicId/:type
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

## Testing

Run the test script to verify all functionality:

```bash
node test-pagination.js
```

This script will:
1. Create test incidents
2. Test pagination
3. Test sorting
4. Test search functionality
5. Test filtering
6. Test combined features

## Microservice Communication

This microservice communicates with the gateway using Redis transport. The following message patterns are supported:

- `get_all_incidents`: Retrieve incidents with pagination, filtering, sorting, and search
- `get_incident_by_id`: Get a specific incident by ID
- `create_incident`: Create a new incident
- `upload_file`: Upload a file to an incident
- `delete_file`: Delete a file from an incident

## File Upload Support

### Supported Image Types
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Supported Audio Types
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- M4A (.m4a)

### File Size Limits
- Images: Maximum 5MB
- Audio: Maximum 10MB

## Error Handling

The microservice provides comprehensive error handling with appropriate HTTP status codes and descriptive error messages for:

- Invalid parameters
- Database errors
- File upload failures
- Microservice communication issues

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

## Architecture

The microservice follows a modular architecture with:

- **Controllers**: Handle incoming requests and responses
- **Services**: Contain business logic
- **Providers**: Database and external service connections
- **DTOs**: Data transfer objects for type safety
- **Schemas**: MongoDB schemas for data validation

## Dependencies

- **NestJS**: Framework for building scalable server-side applications
- **Mongoose**: MongoDB object modeling tool
- **Redis**: In-memory data structure store for microservice communication
- **Cloudinary**: Cloud service for image and video management
- **Swagger**: API documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
