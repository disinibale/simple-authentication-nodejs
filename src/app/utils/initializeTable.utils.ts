import { faker } from '@faker-js/faker'
import { ProfileCreationAttributes } from '../../models/interfaces/profile.interface'
import { UserCreationAttributes } from '../../models/interfaces/user.interface'
import profileService from '../services/profile.service'
import userService from '../services/user.service'
import logger from '../../logger'

export default async function initializeTable(): Promise<void> {
	try {
		const isUserDataExist = await userService.findAll()

		if (isUserDataExist.length < 1) {
			const userValue = {
				fullname: 'Muhamad Iqbal Nurzaman',
				username: 'bale',
				password: 'password'
			} as UserCreationAttributes
			const profileValue = {
				bio: faker.music.songName(),
				dateOfBirth: faker.date.between({
					from: '1993-07-28T00:00:00.000Z',
					to: '2005-07-28T00:00:00.000Z'
				})
			} as ProfileCreationAttributes

			const createdUser = await userService.create(userValue, {
				logging: false
			})
			await profileService.create(
				{ ...profileValue, userId: createdUser.id },
				{ logging: false }
			)

			logger.debug('Table Initializing Success')
		}

		return
	} catch (err) {
		logger.error('Table Initializing Failed')
		throw new Error(err as string)
	}
}
