<script>
	import { ref } from 'vue';
	import { useThemeStore } from '@/stores/themes';
	import { useRoute, useRouter } from 'vue-router';

	export default {
		name: 'CreateThemePage',
		props: {},

		setup() {
			const themeStore = useThemeStore();
			const router = useRouter();
			const route = useRoute();

			const themeId = route.params.themeId;
			const theme = themeStore.themes[themeId];

			if (! theme) router.push('/');

			const newTheme = ref({
				title: theme.title,
			});

			const updateTheme = () => {
				themeStore.updateTheme(themeId, newTheme.value);
			};

			return {
				newTheme,

				updateTheme,

				theme,
			};
		}
	};
</script>

<template>
	<router-link :to="`/themes`">
		<button>Retour</button>
	</router-link>
	<section>
		<form class="create-theme" @submit.prevent="updateTheme">
			<h1>Modifier un Thème</h1>

			<label for="title">Titre: </label>
			<input type="text" id="title" v-model="newTheme.title" required />

			<button type="submit">Valider</button>
		</form>
	</section>
</template>



<style lang="scss" scoped>
</style>