import { defineStore } from 'pinia';

const reminderTimeouts = {};

export const useReminderStore = defineStore('reminders', {
	state: () => ({
		reminders: {
			'Histoire': {
				enabled: false,
				category: null,
				lastReminded: new Date(),
				remindTime: new Date(0, 0, 1, 10),
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
			const remindTime = new Date(this.reminders[topic].remindTime);

			const nextReminder = new Date(
				lastReminded.getFullYear(),
				lastReminded.getMonth,
				lastReminded.getDate(),
				remindTime.getHours(),
				remindTime.getMinutes(),
				remindTime.getSeconds(),
				remindTime.getMilliseconds()
			);

			// Push the reminder immediately, if it's overdue.
			if (now >= nextReminder) {
				this.pushReminderNotification(topic);
				this.reminders[topic].lastReminded = nextReminder;
				nextReminder.setDate(nextReminder.getDate() + 1);
			}

			// Calculate the next reminder time
			const delay = nextReminder.getTime() - now.getTime();

			const timeoutId = setTimeout(() => {
				this.pushReminderNotification(topic);
				this.reminders[topic].lastReminded = new Date(Date.now());

				this.scheduleReminder(topic);
			}, delay);

			reminderTimeouts[topic] = timeoutId;
		},

		pushReminderNotification(topic) {
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
