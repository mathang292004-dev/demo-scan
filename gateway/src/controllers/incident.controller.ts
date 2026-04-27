import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Param,
  UseInterceptors,
  UploadedFiles,
  Delete,
  BadRequestException,
  HttpException,
  HttpStatus,
  Query,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IncidentService } from '../services/incident.service';
import { IncidentDTO } from 'common-dto';
import { CloudinaryService } from 'src/cloudinaryService';
import { CONSTANT_MSG } from 'common-dto'
import { Server } from 'socket.io';
import { memoryStorage } from 'multer';
import { AssemblyAI } from 'assemblyai';


@WebSocketGateway({ cors: true })
@Controller('incident')
export class IncidentController {
  @WebSocketServer()
  server: Server;
  private assemblyClient: AssemblyAI;
  private logger = new Logger('IncidentController');


  constructor(
    private incidentService: IncidentService,
    private cloudinaryService: CloudinaryService,
  ) {
    this.assemblyClient = new AssemblyAI({
      apiKey: 'efad93c3420149d2a280e4b0b1076dc0',
    });
  }

  // GET INCIDENTS LIST
  @Get('/getincidentsList')
  @ApiTags('Incident')
  @ApiOperation({
    summary: 'Get incidents with pagination, filtering, sorting, and search',
  })
  @ApiQuery({
    name: 'filters',
    required: false,
    type: String,
    description: 'JSON stringified filters object',
    example: '{"page":0,"limit":50,"incidentStatus":"active"}'
  })
  @ApiOkResponse({
    description: 'List of incidents with pagination info',
  })
  async getAllIncidents(
    @Query('filters') filters?: any,
  ) {
    try {
      let params = {};
      if (filters) {
        params = JSON.parse(filters);
      }
      return await this.incidentService.getAllIncidents(params);
    } catch (error) {
      this.logger.error(`Error in getAllIncidents: ${error.message}`);
      throw error instanceof BadRequestException
        ? error
        : new HttpException(
          CONSTANT_MSG.INCIDENT_LIST_FAILED,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  // GET INCIDENT BY ID
  @Get('/getIncidentById/:id')
  @ApiTags('Incident')
  @ApiOperation({ summary: 'Get incident by ID' })
  @ApiParam({ name: 'id', description: 'Incident ID' })
  @ApiOkResponse({ description: 'Incident retrieved successfully' })
  async getIncidentById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException(CONSTANT_MSG.INVALID_ID);
    }
    return await this.incidentService.getIncidentById(id);
  }

  // UPDATE INCIDENT
  @Post('/updateIncident')
  @ApiTags('Incident')
  @ApiOperation({ summary: 'Upload multiple files (image/audio) and link to incident' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        incidentId: {
          type: 'string',
        },
      },
      required: ['file', 'incidentId'],
    },
  })
  @ApiOkResponse({ description: 'update Incident successfully' })
  @ApiResponse({ status: 500, description: 'update incident failed' })
  @UseInterceptors(FileInterceptor('file'))
  async updateIncident(
    @UploadedFile() file: Express.Multer.File,
    @Body('incidentId') incidentId?: string
  ) {
    try {
      console.log('Uploaded file:', file);
      // Upload file to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadFile(file);

      // Store in DB or attach to incident
      return await this.incidentService.updateIncident(uploadResult, incidentId);
    } catch (error) {
      this.logger.error('Upload failed:', error);
      throw new HttpException(
        CONSTANT_MSG.FILE_UPLOAD_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // CREATE INCIDENT
  @Post('/createIncident')
  @ApiTags('Incident')
  @ApiOperation({ summary: 'Upload multiple files (image/audio) and link to incident' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiOkResponse({ description: 'create Incident successfully' })
  @ApiResponse({ status: 500, description: 'create incident failed' })
  @UseInterceptors(FileInterceptor('file'))
  async createIncident(
    @UploadedFile() file: Express.Multer.File,
    // @Body('incidentId') incidentId?: string
  ) {
    try {
      console.log('Uploaded file:', file);
      // Upload file to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadFile(file);

      // Store in DB or attach to incident
      return await this.incidentService.createIncident(uploadResult);
    } catch (error) {
      this.logger.error('Upload failed:', error);
      throw new HttpException(
        CONSTANT_MSG.FILE_UPLOAD_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // DELETE FILE BY PUBLIC ID
  @Post('/deletefileincident')
  @ApiTags('Incident')
  @ApiOperation({ summary: 'Delete a file by its Cloudinary publicId' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicId: { type: 'string' },
      },
      required: ['publicId'],
    },
  })
  @ApiOkResponse({ description: 'File deleted successfully' })
  @ApiResponse({ status: 500, description: 'File deletion failed' })
  async deleteFile(@Body('publicId') publicId: string) {
    try {
      const result = await this.cloudinaryService.deleteFile(publicId);
      if (result.result == CONSTANT_MSG.OK) {
        return { message: CONSTANT_MSG.FILE_DELETED_SUCCESSFULLY };
      } else {
        return { mesage: CONSTANT_MSG.FILE_ALREADY_DELETED };
      }
    } catch (error) {
      throw new HttpException(CONSTANT_MSG.FILE_DELETED_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/reportIncident')
  @ApiTags('Incident')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload audio files',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('file', 10, { storage: memoryStorage() }),
  )
  async reportIncident(@UploadedFiles() files: Array<Express.Multer.File>) {
    const audioFiles = files.filter(f => f.mimetype.startsWith('audio/'));

    if (!audioFiles.length) {
      throw new Error('No audio files found');
    }

    const transcripts = await Promise.all(
      audioFiles.map(async (file) => {
        const transcript = await this.assemblyClient.transcripts.transcribe({
          audio: file.buffer,
        });
        return transcript.text || '';
      }),
    );

    const combinedText = transcripts.join(' ').trim();
    return await this.incidentService.reportIncident(combinedText);
  }


  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiTags('Files')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadFile(file);
    return result;
  }


}
