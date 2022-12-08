// --- Dev dependencies
import chalk from 'chalk'

// --- Modules
import { ServicesModule } from '../modules/ServicesModule'

// --- Variables
const { env } = process

// --- Class
export class LoggerService {
	// --- Template
	static Template(content:string):void {
		// --- Return
		return console.log(`${chalk.grey.bold('─────────────────────────────────')}\n\n${chalk.blueBright(ServicesModule.Date.TimeDay())} [::] ${chalk.white.bold(`${env.API_NAME} [${env.API_VERSION}][${env.PORT}]`)} ${content}\n`)
	}

	// --- Switch
	static Switch(content:string, type:string):void {
		switch (type) {
			case 'log':
				// --- Return
				return this.Template(
					`${chalk.white.bgBlueBright(` ${type.toUpperCase()} `)} ${chalk.blueBright.bold(`[?]`)} » ${content}`)
			case 'error':
				// --- Return
				return this.Template(
					`${chalk.white.bgRedBright(` ${type.toUpperCase()} `)} ${chalk.bold.redBright(`[x]`)} » ${chalk.bold.white.redBright.bold(`${content}`)}`)
			case 'ready':
				// --- Return
				return this.Template(
					`${chalk.black.bgGreenBright(` ${type.toUpperCase()} `)} ${chalk.greenBright.bold(`[✓]`)} » ${content}`)
			case 'warn':
				// --- Return
				return this.Template(
					`${chalk.black.black.bgYellow(` ${type.toUpperCase()} `)} ${chalk.yellow(`[!]`)} » ${content}`)
			case 'debug':
				// --- Return
				return this.Template(
					`${chalk.white.bgMagenta(` ${type.toUpperCase()} `)} ${chalk.magenta.bold(`[#]`)} » ${content}`)
			case 'socket':
				// --- Return
				return this.Template(
					`${chalk.white.bgBlueBright(` ${type.toUpperCase()} `)} ${chalk.blueBright.bold(`[?]`)} » ${content}`)
			case 'socketJoin':
				// --- Return
				return this.Template(
					`${chalk.white.bgBlueBright(` ${'socket'.toUpperCase()} `)} ${chalk.greenBright.bold(`[+]`)} » ${content}`)
			case 'socketLeave':
				// --- Return
				return this.Template(
					`${chalk.white.bgBlueBright(` ${'socket'.toUpperCase()} `)} ${chalk.redBright.bold(`[-]`)} » ${content}`)
			case 'dev':
				// --- Return
				return this.Template(
					`${chalk.black.bgYellowBright(` ${type.toUpperCase()} `)} ${chalk.yellowBright.bold(`[▲]`)} » ${content}`)
			case 'prod':
				// --- Return
				return this.Template(
					`${chalk.black.bgCyanBright(` ${type.toUpperCase()} `)} ${chalk.cyanBright.bold(`[◆]`)} » ${content}`)
			case 'email':
				// --- Return
				return this.Template(
					`${chalk.black.bgCyan(` ${type.toUpperCase()} `)} ${chalk.cyan(`[@]`)} » ${content}`)
			case 'database':
				// --- Return
				return this.Template(
					`${chalk.white.bgBlueBright(` ${type.toUpperCase()} `)} ${chalk.blueBright(`[◇]`)} » ${content}`)
			default:
				throw new TypeError(
					'Log type must be warn, debug, log, ready, socketJoin, socketLeave, cmd, database or error.'
				)
		}
	}

	// --- Log
	static Log(content:string) {
		// --- Return
		return this.Switch(content, 'log')
	}

	// --- Error
	static Error(content:string) {
		// --- Return
		return this.Switch(content, 'error')
	}

	// --- Ready
	static Ready(content:string) {
		// --- Return
		return this.Switch(content, 'ready')
	}

	// --- Warn
	static Warn(content:string) {
		// --- Return
		return this.Switch(content, 'warn')
	}

	// --- Debug
	static Debug(content:string) {
		// --- Return
		return this.Switch(content, 'debug')
	}

	// --- Socket
	static Socket(content:string) {
		// --- Return
		return this.Switch(content, 'socket')
	}

	// --- SocketJoin
	static SocketJoin(content:string) {
		// --- Return
		return this.Switch(content, 'socketJoin')
	}

	// --- SocketLeave
	static SocketLeave(content:string) {
		// --- Return
		return this.Switch(content, 'socketLeave')
	}

	// --- Dev
	static Dev(content:string) {
		// --- Return
		return this.Switch(content, 'dev')
	}

	// --- Prod
	static Prod(content:string) {
		// --- Return
		return this.Switch(content, 'prod')
	}

	// --- Email
	static Email(content:string) {
		// --- Return
		return this.Switch(content, 'email')
	}

	// --- Database
	static Database(content:string) {
		// --- Return
		return this.Switch(content, 'database')
	}
}
