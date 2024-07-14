import { defineStore } from 'pinia';

const reminderTimeouts = {};

export const useReminderStore = defineStore('reminders', {
	state: () => ({
		reminders: {
			'Histoire': {
				enabled: false,
				category: null,
				lastReminded: new Date(),
				frequency: new Date(15000),
			},
		}
	}),

	actions: {
		addReminder(topic, reminder) {
			this.reminders[topic] = reminder;
			console.log('Reminder added: ', reminder);
		},

		removeReminder(topic) {
			delete this.reminders[topic];
		},

		getReminder(topic) {
			return this.reminders[topic];
		},

		scheduleReminders() {
			for (const topic in this.reminders) {
				if (this.reminders[topic].enabled) {
					this.scheduleReminder(topic);
				}
			}
		},

		toggleReminders() {
			for (const topic in this.reminders) {
				if (this.reminders[topic].enabled) {
					this.disableReminder(topic);
				}
				else {
					this.enableReminder(topic);
				}
			}
		},

		enableReminders() {
			for (const topic in this.reminders) {
				this.enableReminder(topic);
			}
		},
		enableReminder(topic) {
			this.scheduleReminder(topic);
			this.reminders[topic].enabled = true;
		},

		disableReminders() {
			for (const topic in this.reminders) {
				this.disableReminder(topic);
			}
		},
		disableReminder(topic) {
			if (reminderTimeouts[topic] !== undefined) {
				clearTimeout(reminderTimeouts[topic]);
				reminderTimeouts[topic] = undefined;
			}
			this.reminders[topic].enabled = false;
		},

		scheduleReminder(topic) {
			const now = new Date(Date.now());

			const lastReminded = new Date(this.reminders[topic].lastReminded);
			const frequency = new Date(this.reminders[topic].frequency);

			const intervalsPassed = Math.floor((now - lastReminded) / frequency);

			// Show the reminder immediately, if it overdue.
			if (intervalsPassed > 0) {
				this.showReminderNotification(topic);
				this.reminders[topic].lastReminded = now;
			}

			// Calculate the next reminder time
			const nextReminder = new Date(lastReminded.getTime() + (intervalsPassed + 1) * frequency.getTime());
			const delay = nextReminder.getTime() - now.getTime();
			console.log(delay);

			const timeoutId = setTimeout(() => {
				this.showReminderNotification(topic);
				this.reminders[topic].lastReminded = new Date(Date.now());

				this.scheduleReminder(topic);
			}, delay);

			reminderTimeouts[topic] = timeoutId;
		},

		showReminderNotification(topic) {
			if ('serviceWorker' in navigator && 'PushManager' in window) {
				navigator.serviceWorker.ready.then((registration) => {
					const reminder = this.reminders[topic];

					if (reminder.category) {
						registration.showNotification(
							`Reminder for ${reminder.category} (${topic})`,
							{
								body: `It's time for your ${reminder.category} (${topic}) reminder!`,
								icon: '/path/to/icon.png', // TODO: get topic icon & badge
								badge: '/path/to/badge.png',
								data: { url: `${process.env.BASE_URL}/${topic}/${reminder.category}` }
							}
						);
					}
					else {
						registration.showNotification(
							`Reminder for ${topic}`,
							{
								body: `It's time for your ${topic} reminder!`,
								icon: '/path/to/icon.png', // TODO: get topic icon & badge
								badge: '/path/to/badge.png',
								data: { url: `${process.env.BASE_URL}/${topic}` }
							}
						);
					}
				});
			}
		}
	},

	getters: {
		totalReminders: (state) => {
			return Object.keys(state.reminders).length;
		},
		isEnabled: (state) => {
			return state.enabled;
		}
	},

	persist: {
		storage: sessionStorage,
		paths: ['reminders'],
	},
});
