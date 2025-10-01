import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StrapiService {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('strapi.url');
    this.token = this.configService.get<string>('strapi.token');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  async find(contentType: string, params?: any) {
    const url = `${this.baseUrl}/api/${contentType}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.getHeaders(),
        params,
      }),
    );
    return response.data;
  }

  async findOne(contentType: string, id: string | number, params?: any) {
    const url = `${this.baseUrl}/api/${contentType}/${id}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: this.getHeaders(),
        params,
      }),
    );
    return response.data;
  }

  async create(contentType: string, data: any) {
    const url = `${this.baseUrl}/api/${contentType}`;
    const response = await firstValueFrom(
      this.httpService.post(
        url,
        { data },
        {
          headers: this.getHeaders(),
        },
      ),
    );
    return response.data;
  }

  async update(contentType: string, id: string | number, data: any) {
    const url = `${this.baseUrl}/api/${contentType}/${id}`;
    const response = await firstValueFrom(
      this.httpService.put(
        url,
        { data },
        {
          headers: this.getHeaders(),
        },
      ),
    );
    return response.data;
  }

  async delete(contentType: string, id: string | number) {
    const url = `${this.baseUrl}/api/${contentType}/${id}`;
    const response = await firstValueFrom(
      this.httpService.delete(url, {
        headers: this.getHeaders(),
      }),
    );
    return response.data;
  }
}



