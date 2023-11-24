import Profile from '../../models/profile.model'
import { MappedProfile } from '../controllers/profile.controller'

export function calculateAge(dateOfBirth: Date): number {
	const birthDate = new Date(dateOfBirth)
	const currentDate = new Date()

	let age = currentDate.getFullYear() - birthDate.getFullYear()

	const birthMonth = birthDate.getMonth()
	const currentMonth = currentDate.getMonth()
	const birthDay = birthDate.getDate()
	const currentDay = currentDate.getDate()

	if (
		currentMonth < birthMonth ||
		(currentMonth === birthMonth && currentDay < birthDay)
	) {
		age--
	}

	return age
}

export function mapProfile(profile: Profile): MappedProfile {
	const { user } = profile

	return {
		profile: {
			id: profile.id,
			dateOfBirth: profile.dateOfBirth,
			bio: profile.bio,
			gender: profile.gender,
			userId: profile.userId,
			age: profile.dateOfBirth
				? calculateAge(profile.dateOfBirth as Date)
				: null,
			fullname: user.fullname
		}
	}
}
