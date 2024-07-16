<script>
	import { useRoute, useRouter } from 'vue-router'
	import { useThemeStore } from '@/stores/themes';
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CategoryListPage',
		props: {},

		setup() {
			const themeStore = useThemeStore();
			const categoryStore = useCategoryStore();
			const router = useRouter();
			const route = useRoute();

			const themeId = route.params.themeId;
			const theme = themeStore.themes[themeId];

			if (! theme) router.push('/');


			const filteredCategories = categoryStore.fromTheme(themeId);

			return {
				themeId: themeId,
				categories: filteredCategories,
			};
		}
	};
</script>

<template>
	<router-link :to="`/themes`">
		<button>Retour</button>
	</router-link>
	<router-link :to="`/categories/create/${themeId}`">
		<button>Ajouter une Catégorie</button>
	</router-link>

	<div class="item-list">
		<CategoryComponent v-for="category in categories" :key="category.title" :category="category" />
	</div>
</template>



<style lang="scss" scoped>
</style>