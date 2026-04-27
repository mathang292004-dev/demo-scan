import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout, catchError, throwError } from 'rxjs';
import { CONSTANT_MSG } from 'common-dto'

@Injectable()
export class IncidentService {
    private logger = new Logger('IncidentService');

    constructor(
        @Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy,
    ) { }

    public getAllIncidents(params) {
        return lastValueFrom(
            this.redisClient.send({ cmd: 'get_all_incidents' }, params).pipe(
                catchError((error) => {
                    this.logger.error(
                        `${CONSTANT_MSG.ERROR_GETTING_ALL_INCIDENTS}${error.message}`,
                    );
                    return throwError(
                        () =>
                            new Error(
                                `${CONSTANT_MSG.ERROR_GETTING_ALL_INCIDENTS}${error.message}`,
                            ),
                    );
                }),
            ),
        );
    }

    public getIncidentById(incidentId) {
        return lastValueFrom(
            this.redisClient.send({ cmd: 'get_incident_by_id' }, incidentId).pipe(
                catchError((error) => {
                    this.logger.error(
                        `${CONSTANT_MSG.ERROR_GETTING_INCIDENT_BY_ID}${error.message}`,
                    );
                    return throwError(
                        () =>
                            new Error(
                                `${CONSTANT_MSG.ERROR_GETTING_INCIDENT_BY_ID}${error.message}`,
                            ),
                    );
                }),
            ),
        );
    }

    public updateIncident(result: any, incidentId?: string) {
        return lastValueFrom(
            this.redisClient
                .send(
                    { cmd: 'create_incident' },
                    JSON.stringify({ result, incidentId }),
                ).pipe(
                    catchError((error) => {
                        this.logger.error(
                            `${CONSTANT_MSG.ERROR_CREATING_INCIDENT} ${error.message}`,
                        );
                        return throwError(
                            () =>
                                new Error(
                                    `${CONSTANT_MSG.ERROR_CREATING_INCIDENT} ${error.message}`,
                                ),
                        );
                    }),
                ),
        );
    }

    public async createIncident(result: any) {
        return lastValueFrom(
            this.redisClient
                .send(
                    { cmd: 'create_incident' },
                    JSON.stringify({ result }),
                )
                .pipe(
                    catchError((error) => {
                        this.logger.error(
                            `${CONSTANT_MSG.ERROR_UPLODING_FILES} ${error.message}`,
                        );
                        return throwError(
                            () =>
                                new Error(
                                    `${CONSTANT_MSG.ERROR_UPLODING_FILES}${error.message}`,
                                ),
                        );
                    }),
                ),
        );
    }

    async processAudioChunk(audioChunk: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            this.redisClient
                .send({ cmd: 'process_audio_chunk' }, audioChunk)
                .pipe(
                    catchError((err) => {
                        this.logger.error(`Audio processing failed: ${err.message}`);
                        return throwError(() => err);
                    }),
                )
                .subscribe({
                    next: (result) => resolve(result),
                    error: (err) => reject(err),
                });
        });
    }

    async reportIncident(text: string) {
        return lastValueFrom(
            this.redisClient.send({ cmd: 'report_incident' }, text).pipe(
                catchError((error) => {
                    this.logger.error(
                        `${CONSTANT_MSG.ERROR_EXTRACTING_TEXT_FROM_AUDIO}${error.message}`,
                    );
                    return throwError(
                        () =>
                            new Error(
                                `${CONSTANT_MSG.ERROR_EXTRACTING_TEXT_FROM_AUDIO}${error.message}`,
                            ),
                    );
                }),
            ),
        );
    }
}
