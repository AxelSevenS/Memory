<script>
	// import router from '@/router';
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

	<div class="list-theme" v-for="theme in themes" :key="theme.title">
		<!-- <li class="list"  > -->
			<ThemeComponent :theme="theme" />

			<!-- <button @click="deleteTheme(theme)">supprimer</button> -->
		<!-- </li> -->
	</div>
</template>



<style lang="scss" >
	.list-theme {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>