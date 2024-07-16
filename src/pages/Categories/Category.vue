<script>
	import { useRoute, useRouter } from 'vue-router';
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CategoryPage',
		props: {},
		setup() {
			const categoryStore = useCategoryStore();
			const router = useRouter();
			const route = useRoute();

			const categoryId = route.params.categoryId;
			const category = categoryStore.categories[categoryId];

			if (! category) router.push('/');

			return {
				category
			};
		}
	}
</script>



<template>
	<router-link :to="`/categories/list/${themeId}`">
		<button>Retour</button>
	</router-link>

	<div>
		<h1>Categorie</h1>
	</div>
</template>



<style lang="scss">
	// h1 {
	// 	color: red;
	// 	font-size: 500px;
	// }
</style>
