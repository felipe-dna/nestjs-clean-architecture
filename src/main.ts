import { NestFactory } from '@nestjs/core'
import { AppModule } from '@modules/app.module'
import { INestApplication, Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiConfigService } from '@services/api-config.service'

/**
 * Sets up the swagger module.
 *
 * @ref https://docs.nestjs.com/openapi/introduction#document-options
 */
function setSwagger(app: INestApplication) {
	const config = app.get<ApiConfigService>(ApiConfigService).swaggerConfig
	const swaggerConfig = new DocumentBuilder()
		.setTitle(config.title)
		.setDescription(config.description)
		.setVersion(config.version)
		.addTag(config.tag)
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup(config.url, app, document)
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
	const config = app.get<ApiConfigService>(ApiConfigService)
	const logger = new Logger(config.appConfig.name)

	/**
	 * Swagger
	 */
	logger.log('Setting up swagger...')
	setSwagger(app)

  await app.listen(3000)
}
bootstrap()
