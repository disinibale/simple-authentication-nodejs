import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterDto {
	@IsNotEmpty()
	fullname!: string

	@IsString()
	@IsNotEmpty()
	username!: string

	@MinLength(6)
	@IsNotEmpty()
	password!: string
}

export class SignInDto {
	@IsString()
	@IsNotEmpty()
	username!: string

	@MinLength(6)
	@IsNotEmpty()
	password!: string
}
