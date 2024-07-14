<script>
	import { useRoute } from 'vue-router'
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CategoryListPage',
		props: {},

		setup() {
			const themeId = useRoute().params.themeId;

			const categoryStore = useCategoryStore();
			const filteredCategories = categoryStore.categories.filter(category => category.theme === themeId);

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
	.create-category {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// height: 100vh;
		width: 100%;


		& h1 {
			font-size: 2rem;
			font-weight: bold;
			text-decoration: underline ;
			font-family: 'Russo One', sans-serif;

		}

		&__child {
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 50%;
			height: 50%;


			&-form {
				margin-top: 2rem;
				width: 50%;
				background-color: #f1f1f1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				& h1 {
					font-size: 2rem;
					font-weight: bold;
					font-family: 'Russo One', sans-serif;
				}
				& label {
					font-size: 1.5rem;
					font-weight: bold;
					font-family: 'Russo One', sans-serif;
				}
			}
		}
	}
</style>