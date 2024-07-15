<script>
	import { useRoute } from 'vue-router'
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CategoryListPage',
		props: {},

		setup() {
			const themeId = useRoute().params.themeId;

			const categoryStore = useCategoryStore();
			const filteredCategories = categoryStore.fromTheme(themeId);

			return {
				themeId: themeId,
				categories: filteredCategories,
			};
		}
	};
</script>

<template>
	<router-link :to="`/categories/create/${themeId}`">
		<button>Ajouter une Catégorie</button>
	</router-link>

	<ul>
		<li v-for="category in categories" :key="category.title">
			<CategoryComponent :category="category" />
		</li>
	</ul>
</template>



<style lang="scss" scoped>
</style>