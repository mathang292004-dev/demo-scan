import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  successMessage(data, message, code, status) {
    return {
      data,
      message: message,
      statusCode: code,
      status: status,
    };
  }

  errorMessage(message, code, logger, error) {
    logger.error(message, error);
    return {
      message: message,
      statusCode: code,
      error: error.stack,
    };
  }

  makeListParams(detail) {
    // detail = detail ? JSON.parse(detail) : {};

    const limit = Number(detail.limit) || 10;
    const sort = detail.sort || 'reportedDate';
    const order = Number(detail.order) || -1;
    const sortFilter: any = {};
    const page = Number(detail.page) || 0;
    const skip = page * limit;
    const search = detail.search || null;
    sortFilter[sort] = order;
    const type = detail.type || null;
    const incidentStatus = detail.incidentStatus || null;
    const severityLevel = detail.severityLevel || null;

    return {
      limit,
      sortFilter,
      skip,
      search,
      type,
      incidentStatus,
      severityLevel,
    };
  }

  getFilterParams(payload: any, params: any): any {
    const condition: any = { isDeleted: false };

    // Merge arbitrary filters
    if (payload.filters && typeof payload.filters === 'object') {
      Object.assign(condition, payload.filters);
    }

    // Text search on multiple fields
    if (params.search) {
      const regex = new RegExp(params.search, 'i');
      condition.$or = [
        { country: regex },
        { Branch: regex },
        { 'incidentOverview.title': regex },
        { 'incidentOverview.summary': regex },
      ];
    }

    // Optional filtering by incidentStatus
    if (params.incidentStatus) {
      condition.incidentStatus = params.incidentStatus;
    }

    if (params.severityLevel) {
      condition.severityLevel = params.severityLevel;
    }

    return condition;
  }

  generateIncidentId(): string {
    // Static-like storage using a closure
    if (!(this as any)._incidentState) {
      (this as any)._incidentState = {
        usedNumbers: new Set<number>(),
        currentLength: 3
      };
    }

    const state = (this as any)._incidentState;

    const min = Math.pow(10, state.currentLength - 1);
    const max = Math.pow(10, state.currentLength) - 1;

    if (state.usedNumbers.size >= max - min + 1) {
      state.usedNumbers.clear();
      state.currentLength++;
      return this.generateIncidentId(); // retry with new digit length
    }

    let random: number;
    do {
      random = Math.floor(min + Math.random() * (max - min + 1));
    } while (state.usedNumbers.has(random));

    state.usedNumbers.add(random);

    return `INC${random}`;
  }


}
