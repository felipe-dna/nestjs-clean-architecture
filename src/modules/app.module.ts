import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { AccessTokenGuard } from '@guards'
import { AuthModule } from '@modules/auth/auth.module'
import { ApiConfigService } from '@services/config/api-config.service'
import { DatabaseModule } from '@modules/database/database.module'

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
	providers: [
		/**
		 * Provides the application configuration.
		 */
		ApiConfigService,

		/**
		 * Guards
		 */
		{
			provide: APP_GUARD,
			useClass: AccessTokenGuard
		}
	],
})
export class AppModule {}
