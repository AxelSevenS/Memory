<script>
	import { useRoute, useRouter } from 'vue-router';
	import { useThemeStore } from '@/stores/themes';

	export default {
		name: 'ThemePage',
		props: {},
		setup() {
			const themeStore = useThemeStore();
			const router = useRouter();
			const route = useRoute();

			const themeId = route.params.themeId;
			const theme = themeStore.themes[themeId];

			if (! theme) router.push('/');

			return {
				theme
			};
		}
	}


</script>



<template>
	<section>
		<router-link :to="`/themes`">
			<button>Retour</button>
		</router-link>

		<form class="create-theme">
			<h1>Modifier un Thème</h1>

			<label for="title">Titre: </label>
			<input type="text" id="title" v-model="theme.title" required />

			<button type="submit">Valider</button>
			<div v-if="!theme.title">
				<p>Theme not created yet.</p>
			</div>
		</form>
		<div v-if="theme.title">
			<p>Theme created: {{ theme.title }}</p>
		</div>
	</section>
</template>



<style lang="scss">
</style>
