<script>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router'
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CreateCategoryPage',
		props: {},

		setup() {
			const categoryStore = useCategoryStore();
			const themeId = useRoute().params.themeId;
			const router = useRouter();

			const newCategory = ref({
				title: '',
			});

			const addCategory = () => {
				categoryStore.addCategory(newCategory.value, themeId);

				router.push(`/cards/list/${newCategory.value.title}`);

				newCategory.value.title = '';
			};

			return {
				newCategory,

				addCategory,

			};
		}
	};
</script>

<template>
	<div class="create-category">
		<section class="create-category__child">
			<form class="create-category__child-form" @submit.prevent="addCategory">
				<h1>Ajouter une Catégorie</h1>

				<label for="title">Titre: </label>
				<input type="text" id="title" v-model="newCategory.title" required />

				<button type="submit">Valider</button>
			</form>
		</section>
	</div>
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

			& label {
				margin-top: 1rem;

				font-weight: bold;
				font-family: 'Russo One', sans-serif;
				display: flex;
				justify-content: baseline;
			}

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