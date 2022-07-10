import { writable } from 'svelte/store';

export interface AccentColor {
	accent: string;
	accentDark: string;
}

const accents: AccentColor[] = [
	{ accent: '#19a0b3', accentDark: '#0a3e45' },
	{ accent: '#bf132d', accentDark: '#33060c' },
	{ accent: '#ee10af', accentDark: '#3f052f' },
	{ accent: '#d9bd04', accentDark: '#332d01' }
];

const accent = accents[Math.floor(Math.random() * accents.length)];

const randomAccentStore = writable(accent);
export default randomAccentStore;
