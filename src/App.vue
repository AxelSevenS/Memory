<script>
	import { onMounted } from 'vue';
	import { useConfigStore } from './stores/config';

	export default {
		setup: () => {
			onMounted(() => {
				const configStore = useConfigStore();

				configStore.awakenReminder();

				configStore.$subscribe(() => {
					configStore.updateReminder();
				})
			})
		}
	}
</script>

<template>
	<nav>
		<router-link to="/">Accueil</router-link>
		|
		<router-link to="/themes">Ajouter</router-link>
		|
		<router-link to="/preferences">Préferences</router-link>
	</nav>
	<router-view />
</template>



<style lang="scss">
	:root {
		--color-primary: #42b983;
		--contrast-primary: #fff;

		--color-accent: #2c3e50;
		--contrast-accent: #fff;
	}


	#app {
		font-family: 'Russo One', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: var(--color-accent);
	}

	a {
		text-decoration: initial;
	}

	nav {
		padding: 30px;

		a {
			// font-weight: bold;
			color: var(--color-accent);

			&.router-link-exact-active {
				color: var(--color-primary);
			}
		}
	}


	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		text-align: center;


		& h1 {
			font-size: 2rem;
			font-weight: bold;
			font-family: 'Russo One', sans-serif;
		}

		& label {
			margin-top: 1rem;

			// font-weight: bold;
			font-family: 'Russo One', sans-serif;
			display: flex;
			justify-content: baseline;
		}
	}

	input {
		padding: 0,5rem;
		width: 60%;
		height: 3rem;
		margin: 1rem 0;
		border-radius: 5px;
		border: 1px solid #ccc;
		color: var(--color-primary);
		font-size: 1.5rem;
		font-family: 'Russo One', sans-serif;

		&[type="file"] {
			padding: 0,5rem;
			width: 60%;
			height: 3rem;
			margin: 1rem 0;
			// border-radius: 5px;
			// border: 1px solid #ccc;
			// color: var(--color-primary);
			font-size: 1.5rem;
			font-family: 'Russo One', sans-serif;

		}
	}

	button {
		min-width: 50%;
		min-height: 3rem;
		margin: 1rem 0;

		background-color: var(--color-primary);
		color: var(--contrast-primary);
		font-size: 1.5rem;
		font-family: 'Russo One', sans-serif;

		border-radius: 5px;
		border: 1px solid #ccc;

		&:hover {
			cursor: pointer;

			background-color: var(--color-accent);
			color: var(--contrast-primary);
		}
	}


	li {
		display: flex;
		justify-content: center;
	}


</style>
