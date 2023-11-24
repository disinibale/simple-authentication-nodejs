import { Request, Response, NextFunction } from 'express'

import authService from '../services/auth.service'
import { UserCreationAttributes } from '../../models/interfaces/user.interface'

export async function register(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const payload = req.body as UserCreationAttributes
	try {
		const user = await authService.signUp(payload)

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = user

		res.status(201).json({
			message: 'Successfully Registered!',
			code: 201,
			data: rest.dataValues
		})
	} catch (err) {
		next(err)
	}
}

export async function login(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	const { username, password } = req.body
	try {
		const auth = await authService.signIn({ username, password })

		res.status(200).json({
			message: 'User Authenticated!',
			code: 200,
			data: {
				token: auth
			}
		})
	} catch (err) {
		next(err)
	}
}
