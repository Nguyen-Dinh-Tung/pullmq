import { Injectable } from '@nestjs/common';
import { logger } from 'src/logger';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
@Injectable()
export class AxiosService {
  private readonly axiosInstance: AxiosInstance;
  private readonly logger = logger;
  private thirdPartyUrl: string;
  constructor(thirdPartyUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: thirdPartyUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.thirdPartyUrl = thirdPartyUrl;
    // Interceptors
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        this.logger.info(
          `Request: ${config.method?.toUpperCase()} ${config.url}`,
          '',
        );
        return config;
      },
      (error) => {
        this.logger.error(`Request Error ${this.thirdPartyUrl}`, error.message);
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.logger.info(
          `Response: ${response.status} ${response.config.url}`,
          '',
        );
        return response;
      },
      (error) => {
        this.logger.error(
          `Response Error`,
          `${error.response?.status || 'Unknown'} - ${error.message}`,
        );
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
