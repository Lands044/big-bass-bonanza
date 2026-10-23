import { DEFAULT_CONFIG as CORE_DEFAULTS } from '@js/config/defaults.js'

// Game-specific defaults for the slot machine, merged on top of the core shape
// (texts/cta/sound/dev). Structural values tied to the CSS grid (columns/rows per
// breakpoint, icon height, icon count) and animation timings stay hardcoded in
// index.js — only values that don't affect layout/animation are config-driven.
//
// Named game.defaults.js (not defaults.js) deliberately: the core kit already
// installs its own src/js/config/defaults.js at that exact path.
export const DEFAULT_CONFIG = {
	...CORE_DEFAULTS,

	game: {
		balance: 1000.00,
		bet: 1.20,
		betStep: 0.60,
		minBet: 0.60,
		maxBet: 48.00,

		// Scripted spin outcomes, in order — the CTA popup opens after the last
		// one. Each entry's `result` is a per-column array of icon numbers (1-8);
		// its shape must match the fixed grid (5 columns x 4 rows desktop, 3x3
		// mobile), so the layout itself is not config-driven, only which
		// numbers/amounts appear. `winLine` is the winning row index per column
		// (null = no icon on the line in that column).
		spins: {
			desktop: [
				{
					type: 'loss',
					winAmount: 0,
					winLine: null,
					result: [
						[2, 4, 1, 7],
						[3, 5, 2, 8],
						[1, 7, 4, 3],
						[6, 2, 5, 1],
						[4, 1, 3, 6]
					]
				},
				{
					type: 'smallwin',
					winAmount: 50,
					winLine: [1, 1, 1, 1, null],
					result: [
						[3, 1, 2, 5],
						[7, 1, 8, 2],
						[5, 1, 6, 8],
						[2, 1, 3, 6],
						[5, 6, 7, 3]
					]
				},
				{
					type: 'bigwin',
					winAmount: 150,
					winLine: [1, 1, 1, 2, 2],
					result: [
						[2, 4, 7, 7],
						[5, 4, 2, 5],
						[3, 4, 8, 3],
						[2, 5, 4, 6],
						[5, 3, 4, 1]
					]
				}
			],
			mobile: [
				{
					type: 'loss',
					winAmount: 0,
					winLine: null,
					result: [
						[4, 1, 7],
						[5, 2, 8],
						[7, 4, 3]
					]
				},
				{
					type: 'smallwin',
					winAmount: 50,
					winLine: [1, 1, 1],
					result: [
						[2, 1, 5],
						[7, 1, 2],
						[6, 1, 8]
					]
				},
				{
					type: 'bigwin',
					winAmount: 150,
					winLine: [1, 1, 1],
					result: [
						[5, 4, 8],
						[3, 4, 2],
						[2, 4, 6]
					]
				}
			]
		}
	},

	// actionButton/rotateNotice from CORE_DEFAULTS.texts are dropped — the spin
	// button here is an icon with no label and there is no rotate-to-portrait
	// overlay, so neither field is read anywhere (see docs/config.md, "No dead or
	// hidden fields").
	texts: (({ actionButton, rotateNotice, ...rest }) => ({
		...rest,
		popupTitle: "Congratulations!",
		popupText: "Ready to continue playing?",
		ctaButton: "Download Now",
		menuTitle: "Place your bets!",
		creditLabel: "Credit",
		betLabel: "Bet",
		bigWin: "BIG WIN!"
	}))(CORE_DEFAULTS.texts),

	assets: {
		...CORE_DEFAULTS.assets,
		logo: "logo",
		background: "bg",
		drumBackground: "bubbles",
		// An empty string mutes that sound entirely (spin is muted on purpose,
		// see commit 342777c "cancel sound spin").
		sounds: {
			spin: "",
			win: "win2",
			select: "select"
		}
	}
}
