import { IsNotEmpty, IsString, IsEmail } from "class-validator"

export class SignupBodyDto {
	@IsNotEmpty()
	@IsString()
	firstName: string

	@IsNotEmpty()
	@IsString()
	lastName: string

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@IsString()
	@IsString()
	password: string
}
