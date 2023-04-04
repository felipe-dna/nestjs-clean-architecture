import { Repository } from "@base/repository";
import { PrismaService } from "@services/prisma/prisma.service";

export abstract class DatabaseRepository<TEntity> extends Repository<TEntity> {
	constructor (client: PrismaService) {
		super()
	}
}
