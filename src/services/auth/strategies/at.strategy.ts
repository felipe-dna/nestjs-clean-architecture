import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ApiConfigService } from '@services/config/api-config.service'
import { ExtractJwt, Strategy } from 'passport-jwt'

type JwtPayload = {
	sub: string
	email: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor (private configService: ApiConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.appConfig.accessTokenSecret
		})
	}

	validate(payload: JwtPayload) {
		return payload
	}
}
