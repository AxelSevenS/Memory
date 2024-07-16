<script>
	import { ref } from 'vue';
	import { useConfigStore } from '@/stores/config';
import { timeToDate } from '@/utility';

	export default {
		name: 'PreferencesPage',
		setup() {
			const configStore = useConfigStore();

			const cardsPerDay = ref(configStore.config.cardsPerDay);
			const maxCardLevel = ref(configStore.config.maxCardLevel + 1);

			let reminderDateTime = new Date(configStore.config.reminder.time);
			if (! (reminderDateTime instanceof Date) || isNaN(reminderDateTime)) {
				reminderDateTime = new Date(0, 0, 1, 10);
			}
			const reminderTime = ref(`${reminderDateTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`);
			const reminderEnabled = ref(configStore.config.reminder.enabled);



			configStore.$subscribe(() => {
				cardsPerDay.value = configStore.config.cardsPerDay;
				maxCardLevel.value = configStore.config.maxCardLevel + 1;

				let reminderDateTime = new Date(configStore.config.reminder.time);
				if (! (reminderDateTime instanceof Date) || isNaN(reminderDateTime)) {
					reminderDateTime = new Date();
				}
				reminderTime.value = `${reminderDateTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
				reminderEnabled.value = configStore.config.reminder.enabled;
			})

			return {
				configStore,

				cardsPerDay,
				maxCardLevel,
				reminderTime,
				reminderEnabled,
			};
		},
		methods: {
			async saveConfig() {
				this.configStore.config.cardsPerDay = this.cardsPerDay;
				this.configStore.config.maxCardLevel = this.maxCardLevel - 1;

				const reminderDateTime = timeToDate(this.reminderTime);

				this.configStore.config.reminder.time = reminderDateTime;
				this.configStore.config.reminder.enabled = this.reminderEnabled;
			},


			async requestNotificationPermission() {
				const permission = await Notification.requestPermission();
				if (permission === 'granted') {
					console.log('Notification permission granted.');
				} else {
					console.log('Notification permission denied.');
				}
			},

			async enableDailyReminder() {
				await this.requestNotificationPermission();
				this.configStore.toggleReminders();
			},
		},
	}
</script>



<template>

	<form @submit.prevent="saveConfig">
		<div>
			<h1>Cartes</h1>
		</div>

		<label for="daily-cards">Nouvelles Cartes par Jour: </label>
		<input type="number" id="daily-cards" v-model="cardsPerDay" required />

		<label for="max-card-level">Niveau Maximum d'un Carte: </label>
		<input type="number" id="max-card-level" v-model="maxCardLevel" required />

		<div>
			<h1>Rappels</h1>
		</div>

		<label for="reminder-enabled">Rappels: </label>
		<input type="checkbox" id="reminder-enabled" v-model="reminderEnabled" />

		<label for="reminder-time">Heure de Rappel: </label>
		<input type="time" id="reminder-time" v-model="reminderTime" required />


		<button type="submit">Valider</button>
	</form>
</template>



<style lang="scss">
	// h1 {
	// 	color: red;
	// 	font-size: 500px;
	// }
</style>
