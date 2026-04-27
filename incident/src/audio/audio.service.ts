import { Injectable } from '@nestjs/common';
import { AiService } from 'src/services/ai-service';

@Injectable()
export class AudioService {
    constructor(private aiService: AiService) {}

    public async reportIncident(text: string) {

        try {
           
            const aiExtractedDetails = await this.aiService.extractUserDetails(text);
            let cleanJsonString = (aiExtractedDetails || '')
                .replace(/\/\/.*$/gm, '') // remove single-line comments
                .replace(/,\s*([}\]])/g, '$1'); // remove trailing commas

            const json = JSON.parse(cleanJsonString || '{}');

            return {
              message: 'Reported Incident successfully!',
              extracted: json,
            };

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public createAudioConnection(data: any) {

    }
}
