import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ApiConfigService } from '@services/config/api-config.service'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor (private config: ApiConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.appConfig.refreshTokenSecret,
			passReqToCallback: true
		})
	}

	validate(req: Request, payload: any) {
		const refreshToken = req.get('authorization').replace('Bearer', '').trim()

		return {
			...payload,
			refreshToken
		}
	}
}
