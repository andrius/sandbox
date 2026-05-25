const OPEN_MIN = 23 * 60 + 58; // 11:58 PM
const CLOSE_MIN = 2 * 60 + 35; // 2:35 AM (next day)

export type OpenStatus = {
	isOpen: boolean;
	/** Minutes until the next opening (0 when currently open). */
	minutesUntilOpen: number;
};

export function getOpenStatus(now: Date = new Date()): OpenStatus {
	const minutes = now.getHours() * 60 + now.getMinutes();
	const isOpen = minutes >= OPEN_MIN || minutes < CLOSE_MIN;
	const minutesUntilOpen = isOpen ? 0 : (OPEN_MIN - minutes + 1440) % 1440;
	return { isOpen, minutesUntilOpen };
}

export function formatCountdown(totalMinutes: number, unitH = 'h', unitM = 'm'): string {
	const h = Math.floor(totalMinutes / 60);
	const m = totalMinutes % 60;
	if (h <= 0) return `${m}${unitM}`;
	return `${h}${unitH} ${String(m).padStart(2, '0')}${unitM}`;
}
