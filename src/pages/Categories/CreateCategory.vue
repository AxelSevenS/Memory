<script>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router'
	import { useThemeStore } from '@/stores/themes';
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CreateCategoryPage',
		props: {},

		setup() {
			const themeStore = useThemeStore();
			const categoryStore = useCategoryStore();
			const router = useRouter();
			const route = useRoute();

			const themeId = route.params.themeId;
			const theme = themeStore.themes[themeId];

			if (! theme) router.push('/');


			const newCategory = ref({
				title: '',
			});
			const fileInputRef = ref(null);


			const addCategory = () => {
				const addedCategory = categoryStore.addCategory(newCategory.value, themeId);

				router.push(`/cards/list/${addedCategory.id}`);

				newCategory.value.title = '';
				if (fileInputRef.value) fileInputRef.value.value = null;
			};

			return {
				newCategory,

				addCategory,

				theme,
			};
		}
	};
</script>

<template>
	<router-link :to="`/categories/list/${themeId}`">
		<button>Retour</button>
	</router-link>
	<section v-if="theme">
		<form class="create-category" @submit.prevent="addCategory">
			<h1>Ajouter une Catégorie</h1>

			<label for="title">Titre: </label>
			<input type="text" id="title" v-model="newCategory.title" required />

			<button type="submit">Valider</button>
		</form>
	</section>
</template>



<style lang="scss" scoped>
</style>