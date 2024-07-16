<script>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router'
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CreateCategoryPage',
		props: {},

		setup() {
			const categoryStore = useCategoryStore();
			const router = useRouter();
			const route = useRoute();

			const categoryId = route.params.categoryId;
			const category = categoryStore.categories[categoryId];

			if (! category) router.push('/');


			const editedCategory = ref({
				title: category.title,
			});


			const updateCategory = () => {
				categoryStore.updateCategory(categoryId, editedCategory.value);
			};

			return {
				editedCategory,

				updateCategory,

				category,
			};
		}
	};
</script>

<template>
	<router-link :to="`/categories/list/${category.theme}`">
		<button>Retour</button>
	</router-link>
	<section>
		<form class="create-category" @submit.prevent="updateCategory">
			<h1>Modifier une Catégorie</h1>

			<label for="title">Titre: </label>
			<input type="text" id="title" v-model="editedCategory.title" required />

			<button type="submit">Valider</button>
		</form>
	</section>
</template>



<style lang="scss" scoped>
</style>