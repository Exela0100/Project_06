// --- Dependencies
import dayjs from 'dayjs'

// --- Class
export class DateService {
	// --- Date time day
	static TimeDay(format: string = 'DD MMMM YYYY HH:mm:ss'): string {
		return dayjs().format(format)
	}
}
