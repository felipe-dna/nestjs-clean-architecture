export interface AppConfig {
	port: number
	name: string
}

export interface SwaggerConfig {
	title: string
	description: string
	version: string
	tag: string
	url: string
}

export interface DatabaseConfig {
	port: number
	host: string
	user: string
	password: string
	database: string
	url: string
}
