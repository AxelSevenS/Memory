<script>
	import { ref } from 'vue';
	import { useThemeStore } from '@/stores/themes';
	import { useRouter } from 'vue-router';

	export default {
		name: 'CreateThemePage',
		props: {},

		setup() {
			const themeStore = useThemeStore();
			const router = useRouter();

			const newTheme = ref({
				title: '',
			});

			const addTheme = () => {
				const addedTheme = themeStore.addTheme(newTheme.value);

				router.push(`/categories/list/${addedTheme.id}`)

				newTheme.value.title = '';
			};

			return {
				newTheme,
				addTheme,


			};
		}
	};
</script>

<template>
	<router-link :to="`/themes`">
		<button>Retour</button>
	</router-link>
	<section>
		<form class="create-theme" @submit.prevent="addTheme">
			<h1>Ajouter un Thème</h1>

			<label for="title">Titre: </label>
			<input type="text" id="title" v-model="newTheme.title" required />

			<button type="submit">Valider</button>
		</form>
	</section>
</template>



<style lang="scss" scoped>
</style>