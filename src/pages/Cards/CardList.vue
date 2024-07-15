<script>
	import { useRoute } from 'vue-router'
	import { useCardStore } from '@/stores/cards';

	export default {
		name: 'CardListPage',
		props: {},

		setup() {
			const route = useRoute();
			const categoryId = route.params.categoryId;

			const cardStore = useCardStore();
			const filteredCards = cardStore.fromCategory(categoryId);

			return {
				categoryId: categoryId,
				cards: filteredCards,
			};
		}
	};
</script>

<template>
	<router-link :to="`/cards/create/${categoryId}`">
		<button>Ajouter une Carte</button>
	</router-link>

	<ul>
		<li v-for="card in cards" :key="card.title">
			<CardComponent :card="card" />
		</li>
	</ul>
</template>



<style lang="scss" scoped>
</style>