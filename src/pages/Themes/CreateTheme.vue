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
			<div v-if="!newTheme.title">
				<p>Theme not created yet.</p>
			</div>
			<!-- <router-link :to="'/category/theme/' + newTheme.title">
				<button>Creer une categorie</button>
			</router-link> -->
		</form>
		<div v-if="newTheme.title">
			<p>Theme created: {{ newTheme.title }}</p>
		</div>
	</section>
</template>



<style lang="scss" scoped>
</style>