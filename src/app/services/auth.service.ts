import bcrypt from 'bcrypt'

import User from '../../models/user.model'
import UserService from './user.service'
import { UserCreationAttributes } from '../../models/interfaces/user.interface'

import NotFoundException from '../exceptions/clientException/notFound.exception'
import UnauthorizedException from '../exceptions/clientException/unauthorized.exception'

import connection from '../../database/connection'
import { generateToken } from '../utils/jwt.utils'
import { Transaction } from 'sequelize'
import ProfileService from './profile.service'
import { ProfileCreationAttributes } from '../../models/interfaces/profile.interface'
import EmailAlreadyRegisteredException from '../exceptions/clientException/emailAlreadyRegistered.exception'

class AuthService {
	private userService
	private profileService

	constructor() {
		this.userService = UserService
		this.profileService = ProfileService
	}

	async signUp(data: UserCreationAttributes): Promise<User> {
		const { username, password } = data
		return connection.transaction(async (transaction: Transaction) => {
			const existingUser = await this.userService.isUsernameExist(
				username
			)

			if (existingUser)
				throw new EmailAlreadyRegisteredException(
					'Email already registered!'
				)

			const hashedPassword = await bcrypt.hash(password, 10)

			const createdUser =
				await this.userService.createUserWithTransaction(
					{ ...data, password: hashedPassword },
					transaction
				)

			await this.profileService.createProfileWithTransaction(
				{ userId: createdUser.id } as ProfileCreationAttributes,
				transaction
			)

			return createdUser
		})
	}

	async signIn(data: {
		username: string
		password: string
	}): Promise<string> {
		const { username, password } = data

		const user = await this.userService.findByUsername(username)
		if (!user) throw new NotFoundException('User Not Found!')

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) throw new UnauthorizedException('Invalid Password!')

		const token = await generateToken({
			userId: user.id,
			username: user.username,
			fullname: user.fullname
		})

		return token
	}
}

export default new AuthService()
