import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export class AiService {
    private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    private readonly apiKey = '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'; // Replace with your real key

    async extractUserDetails(text: string): Promise<any> {
        try {
            const prompt = `Extract all possible incident details from the text below and return them as a well-formatted JSON object following this schema:

{
  "reportedBy": String,
  "country": String,
  "Branch": String,
  "reportedDate": Date (ISO format),
  "severityLevel": String,
  "incidentStatus": String,
  "incidentOverview": Object,        // key-value summary of incident details
  "AssetsDamage": Object,            // key-value summary of asset damages
  "PropertyDamage": [
    {
      "propertyType": String,
      "description": String,
      "price": Number
    }
  ]
}

Rules:
- Only include keys if the data is found in the text.
- Dates should be in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ).
- If PropertyDamage has multiple entries, return them as array elements.
- If no damage is mentioned, omit the damage-related fields.

Transcript:
${text}`;


            const response = await axios.post(
                this.apiUrl,
                {
                    model: 'mistralai/mistral-7b-instruct',
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            return response.data.choices?.[0]?.message?.content || '';
        } catch (error) {
            throw new HttpException(
                error.response?.data || 'Failed to call OpenRouter API',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}