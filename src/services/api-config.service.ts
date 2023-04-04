import { AppConfig, DatabaseConfig, SwaggerConfig } from "@/config/configuration"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class ApiConfigService {
	constructor(private configService: ConfigService) {}

	private getVar<T>(name: string): T {
		return this.configService.getOrThrow<T>(name)
	}

	get databaseConfig(): DatabaseConfig {
		return {
			port: this.getVar<DatabaseConfig['port']>('DATABASE_PORT'),
			database: this.getVar<DatabaseConfig['database']>('DATABASE_NAME'),
			host: this.getVar<DatabaseConfig['host']>('DATABASE_HOST'),
			password: this.getVar<DatabaseConfig['password']>('DATABASE_PASSWORD'),
			url: this.getVar<DatabaseConfig['url']>('DATABASE_URL'),
			user: this.getVar<DatabaseConfig['user']>('DATABASE_USER')
		}
	}

	get swaggerConfig(): SwaggerConfig {
		return {
			description: this.getVar<SwaggerConfig['description']>('SWAGGER_DESCRIPTION'),
			tag: this.getVar<SwaggerConfig['tag']>('SWAGGER_TAG'),
			title: this.getVar<SwaggerConfig['title']>('SWAGGER_TITLE'),
			url: this.getVar<SwaggerConfig['url']>('SWAGGER_URL'),
			version: this.getVar<SwaggerConfig['version']>('SWAGGER_VERSION')
		}
	}

	get appConfig(): AppConfig {
		return {
			port: this.getVar<AppConfig['port']>('APP_PORT'),
			name: this.getVar<AppConfig['name']>('APP_NAME')
		}
	}
}
