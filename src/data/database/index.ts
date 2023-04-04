import { Repository } from "@base/repository";
import { Inject } from "@nestjs/common";
import { PrismaService } from "@services/prisma/prisma.service";

export abstract class DatabaseRepository<TEntity> extends Repository<TEntity> {
	constructor (@Inject(PrismaService) client: PrismaService) {
		super()
	}
}
