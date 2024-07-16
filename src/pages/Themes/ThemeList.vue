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
	<router-link :to="`/`">
		<button>Retour</button>
	</router-link>
	<router-link to="/themes/create">
		<button>Ajouter un Thème</button>
	</router-link>

	<div class="item-list">
		<ThemeComponent v-for="theme in themes" :key="theme.title" :theme="theme" />
		<!-- <button @click="deleteTheme(theme)">supprimer</button> -->
	</div>
</template>



<style lang="scss" >
</style>