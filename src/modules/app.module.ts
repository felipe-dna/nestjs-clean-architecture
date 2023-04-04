import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiConfigService } from '@services/config/api-config.service'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'

@Module({
	imports: [
		/**
		 * Config Module:
		 * https://docs.nestjs.com/techniques/configuration
		 */
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		DatabaseModule,
		AuthModule,
	],
	controllers: [],
	providers: [
		/**
		 * Repositories.
		 */

		/**
		 * Use cases.
		 */

		/**
		 * Provides the application configuration.
		 */
		ApiConfigService,
	],
})
export class AppModule {}
