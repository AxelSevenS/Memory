<script>
	import { onMounted } from 'vue';
	import { useReminderStore } from './stores/reminders';


	export default {
		setup: () => {

			onMounted(() => {
				const remindersStore = useReminderStore();

				remindersStore.scheduleReminders();
			})
		}
	}
</script>

<template>
	<nav>
		<router-link to="/">Accueil</router-link>
		|
		<router-link to="/create">Ajouter</router-link>
		|
		<router-link to="/reminders">Rappels</router-link>
	</nav>
	<router-view />
</template>



<style lang="scss">
	#app {
		font-family: 'Russo One', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
