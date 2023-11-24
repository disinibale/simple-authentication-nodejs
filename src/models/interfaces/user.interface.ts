import { Model, Optional } from 'sequelize'
import Profile from '../profile.model'

export interface UserAttributes extends Model {
	id: number
	fullname: string
	username: string
	password: string

	profile: Profile

	createdAt?: Date
	updatedAt?: Date
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
	fullname: string
	username: string
	password: string
}
