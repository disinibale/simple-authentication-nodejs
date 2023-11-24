import {
	ProfileAttributes,
	ProfileCreationAttributes
} from '../../models/interfaces/profile.interface'
import { Transaction } from 'sequelize'

import Profile from '../../models/profile.model'
import BaseService from './base.service'
import User from '../../models/user.model'

class ProfileService extends BaseService<Profile> {
	async createProfileWithTransaction(
		profileData: ProfileCreationAttributes,
		transaction: Transaction
	): Promise<Profile> {
		return await this.create(profileData, {
			transaction
		})
	}

	async getByProfileId(
		profileId: number | undefined
	): Promise<Profile | null> {
		return await this.model.findOne({
			where: {
				userId: profileId
			},
			include: [
				{
					model: User,
					as: 'user'
				}
			]
		})
	}

	async getNullishParameter(
		profileId: number | undefined
	): Promise<string[]> {
		const profile = await this.model.findOne({
			where: {
				userId: profileId
			}
		})

		const values = profile?.dataValues as ProfileAttributes
		const nullishParams = []

		for (const key of Object.keys(values)) {
			if (values[key as keyof ProfileAttributes] === null) {
				nullishParams.push(key)
			}
		}

		return nullishParams
	}
}

export default new ProfileService(Profile)
