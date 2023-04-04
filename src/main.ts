import { NestFactory } from '@nestjs/core'
import { AppModule } from '@modules/app.module'
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiConfigService } from '@services/config/api-config.service'

/**
 * Sets up the swagger module.
 *
 * @see https://docs.nestjs.com/openapi/introduction#document-options
 */
function setSwagger(app: INestApplication) {
	const config = app.get<ApiConfigService>(ApiConfigService).swaggerConfig
	const swaggerConfig = new DocumentBuilder().setTitle(config.title).setDescription(config.description).setVersion(config.version).addTag(config.tag).build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup(config.url, app, document)
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get<ApiConfigService>(ApiConfigService).appConfig
	const logger = new Logger(config.name)

	/**
	 * Swagger
	 */
	logger.log('Setting up swagger...')
	setSwagger(app)

	/**
	 * API versioning.
	 *
	 * @see https://docs.nestjs.com/techniques/versioning#uri-versioning-type
	 */
	app.enableVersioning({
		type: VersioningType.URI,
	})

	/**
	 * Api data validation.
	 *
	 * @see https://docs.nestjs.com/techniques/validation#auto-validation
	 */
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(config.port)
}
bootstrap()
