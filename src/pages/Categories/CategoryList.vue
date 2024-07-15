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

			console.log(themeId);
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