import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		this.$connect()
	}

	async onModuleDestroy() {
		this.$disconnect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}
