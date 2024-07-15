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
	<section>
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