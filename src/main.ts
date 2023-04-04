import { NestFactory } from '@nestjs/core'
import { AppModule } from '@modules/app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

/**
 * Sets up the swagger module.
 *
 * @ref https://docs.nestjs.com/openapi/introduction#document-options
 */
function setSwagger(app) {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
	const config = app.get<ConfigService>(ConfigService)
	const logger = new Logger(config.getOrThrow<string>('APP_NAME'))

	/**
	 * Swagger
	 */
	logger.log('Setting up swagger...')
	setSwagger(app)

  await app.listen(3000)
}
bootstrap()
