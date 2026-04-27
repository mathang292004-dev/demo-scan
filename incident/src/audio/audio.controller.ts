import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AudioService } from './audio.service';
import * as fs from 'fs';
import OpenAI from 'openai';
import * as config from 'config';


const openaiConfig = config.get('openai');
@Controller('audio')
export class AudioController {

      private logger = new Logger('FileUploadController');
    
    constructor(
        private audioService: AudioService,
    ) { }

    private openai = new OpenAI({
        apiKey: openaiConfig.api_key,
    });

    @MessagePattern({ cmd: 'process_audio_chunk' })
    async processChunk(@Payload() audioChunk: Buffer): Promise<string> {
        try {
            // You might need to accumulate chunks into a temporary file first
            fs.writeFileSync('temp.wav', audioChunk);

            const transcription = await this.openai.audio.transcriptions.create({
                file: fs.createReadStream('temp.wav'),
                model: 'whisper-1',
            });

            return transcription.text;
        } catch (err) {
            this.logger.error(`Audio processing error: ${err.message}`);
            throw err;
        }
    }

    @MessagePattern({cmd: 'report_incident'})
    async reportIncident(text: string) {
        return await this.audioService.reportIncident(text);
    }

}
