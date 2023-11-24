import { Transaction } from 'sequelize'
import { UserCreationAttributes } from '../../models/interfaces/user.interface'
import User from '../../models/user.model'
import BaseService from './base.service'

class UserService extends BaseService<User> {
	async createUserWithTransaction(
		userData: UserCreationAttributes,
		transaction: Transaction
	): Promise<User> {
		return await this.model.create(userData, {
			transaction
		})
	}

	async findByUsername(username: string): Promise<User | null> {
		return await this.model.findOne({
			where: {
				username
			}
		})
	}

	async isUsernameExist(username: string): Promise<boolean> {
		const user = await this.findOne({
			where: {
				username
			}
		})

		if (user) return true

		return false
	}
}

export default new UserService(User)
