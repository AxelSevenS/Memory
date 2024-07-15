import { defineStore } from 'pinia';

let reminderTimeout;

export const useConfigStore = defineStore('config', {
	state: () => ({
		config: {
			cardsPerDay: 5,
			maxCardLevel: 6, // 0->6 = 7 levels
			reminder: {
				enabled: false,
				time: new Date(0, 0, 1, 10),
				lastReminded: new Date(),
			},
		}
	}),

	actions: {
		awakenReminder() {
			if (this.config.reminder.enabled) {
				this.scheduleReminder();
			}
		},

		toggleReminders() {
			if (this.config.reminder.enabled) {
				this.disableReminder();
			}
			else {
				this.enableReminder();
			}
		},

		enableReminder() {
			this.scheduleReminder();

			this.config.enabled = true;
		},

		disableReminder() {
			this.clearReminder();

			this.config.enabled = false;
		},

		clearReminder() {
			if (reminderTimeout !== undefined) {
				clearTimeout(reminderTimeout);
				reminderTimeout = undefined;
			}
		},

		scheduleReminder() {
			const now = new Date(Date.now());

			const lastReminded = this.config.reminder.lastReminded ? new Date(this.config.reminder.lastReminded) : new Date();
			const remindTime = this.config.reminder.remindTime ? new Date(this.config.reminder.remindTime) : new Date(0, 0, 1, 10);

			const nextReminder = new Date(lastReminded);
			nextReminder.setHours(
				remindTime.getHours(),
				remindTime.getMinutes(),
				remindTime.getSeconds(),
				remindTime.getMilliseconds()
			);

			// Push the reminder immediately, if it's overdue.
			if (now >= nextReminder) {
				this.pushReminderNotification();
				this.config.reminder.lastReminded = nextReminder;
				nextReminder.setDate(nextReminder.getDate() + 1);
			}

			// Calculate the next reminder time
			const delay = nextReminder.getTime() - now.getTime();

			const timeoutId = setTimeout(() => {
				this.pushReminderNotification();
				this.config.reminder.lastReminded = new Date(Date.now());

				this.scheduleReminder();
			}, delay);

			reminderTimeout = timeoutId;
		},


		updateReminder() {
			this.clearReminder();
			if (this.config.reminder.enabled) {
				this.scheduleReminder();
			}
		},

		pushReminderNotification() {
			if ('serviceWorker' in navigator && 'PushManager' in window) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.showNotification(
						`Mnemosyne`,
						{
							body: `Il est l'heure de votre révision quotidienne !`,
							// icon: '/path/to/icon.png', // TODO: get topic icon & badge
							// badge: '/path/to/badge.png',
							data: { url: process.env.BASE_URL }
						}
					);
				});
			}
		}
	},

	getters: {
		// getReminder: (state) => {
		// 	return state.reminder;
		// },
		isReminderEnabled: (state) => {
			return state.reminder.enabled;
		}
	},

	setters: {

	},

	persist: {
		storage: localStorage,
		paths: ['config'],
	},
});
