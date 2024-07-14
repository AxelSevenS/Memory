<script>
	import { useReminderStore } from '@/stores/reminders';

	const remindersStore = useReminderStore();

	export default {
		name: 'RemindersPage',
		methods: {
			async enableDailyReminder() {
				await this.requestNotificationPermission();
				remindersStore.toggleReminders();
			},

			async requestNotificationPermission() {
				const permission = await Notification.requestPermission();
				if (permission === 'granted') {
					console.log('Notification permission granted.');
				} else {
					console.log('Notification permission denied.');
				}
			},
		}
	}
</script>



<template>
	<div>
		<h1>Rappels</h1>
	</div>
	<div>
		<button @click="enableDailyReminder">Activer les Rappels</button>
	</div>
</template>



<style lang="scss">
	// h1 {
	// 	color: red;
	// 	font-size: 500px;
	// }
</style>
