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

	<div>
		<li class="list" v-for="theme in themes" :key="theme.title">
			<ThemeComponent :theme="theme" />
			<router-link :to="`/themes/${theme.title}`">
				<button>modifier</button>
			</router-link>
			<!-- <button @click="deleteTheme(theme)">supprimer</button> -->
		</li>
	</div>
</template>



<style lang="scss" >
	.list {
		display: flex;
		justify-content: center;
	}
</style>