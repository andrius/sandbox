export const ui = $state<{ callOpen: boolean }>({ callOpen: false });

export function openCall() {
	ui.callOpen = true;
}

export function closeCall() {
	ui.callOpen = false;
}
