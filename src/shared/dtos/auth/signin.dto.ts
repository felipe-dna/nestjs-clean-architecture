import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SiginBodyDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsNotEmpty()
	password: string
}
