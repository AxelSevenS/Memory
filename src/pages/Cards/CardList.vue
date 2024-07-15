<script>
	import { useRoute, useRouter } from 'vue-router'
	import { useCardStore } from '@/stores/cards';
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CardListPage',
		props: {},

		setup() {
			const cardStore = useCardStore();
			const categoryStore = useCategoryStore();
			const router = useRouter();
			const route = useRoute();

			const categoryId = route.params.categoryId;
			const category = categoryStore.categories[categoryId];

			if (! category) router.push('/');

			const filteredCards = cardStore.fromCategory(categoryId);

			return {
				categoryId: categoryId,
				cards: filteredCards,
			};
		}
	};
</script>

<template>

	<h1>Cartes</h1>
	<router-link :to="`/cards/create/${categoryId}`">
		<button>Ajouter une carte</button>
	</router-link>
	<router-link :to="`/themes/`">
		<button>Retour</button>
	</router-link>
	<div class="component__container">
		<div v-for="card in cards" :key="card.title">
			<CardComponent :card="card" />
			<router-link :to="`/cards/create/${categoryId}`">
				<button>Ajouter une Carte</button>
			</router-link>
		</div>

	</div>


</template>



<style lang="scss" scoped>
	.component__container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>