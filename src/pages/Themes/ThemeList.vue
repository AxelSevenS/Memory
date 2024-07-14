<script>
	import { useThemeStore } from '@/stores/themes';

	export default {
		name: 'ThemeListPage',
		props: {},

		setup() {
			const themesStore = useThemeStore();

			return {
				themes: themesStore.themes,
			};
		}
	};
</script>

<template>
	<router-link to="/themes/create">
		<button>Ajouter un Thème</button>
	</router-link>

	<ul>
		<li class="list" v-for="theme in themes" :key="theme.title">
			<ThemeComponent :theme="theme" />
		</li>
	</ul>
</template>



<style lang="scss" >


	.list {
		display: flex;
		justify-content: center;
	}
	.create-theme {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// height: 100vh;
		width: 100%;


		& h1 {
			font-size: 2rem;
			font-weight: bold;
			text-decoration: underline ;
			font-family: 'Russo One', sans-serif;

		}

		&__child {
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 50%;
			height: 50%;


			&-form {
				margin-top: 2rem;
				width: 50%;
				background-color: #f1f1f1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				& h1 {
					font-size: 2rem;
					font-weight: bold;
					font-family: 'Russo One', sans-serif;
				}
				& label {
					font-size: 1.5rem;
					font-weight: bold;
					font-family: 'Russo One', sans-serif;
				}
			}
		}
	}
</style>