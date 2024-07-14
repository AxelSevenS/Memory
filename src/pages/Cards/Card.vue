<script>
	import { useCardStore } from '@/stores/cards';
	import { useRoute } from 'vue-router';

	export default {
		name: 'CardPage',
		setup() {
			const cardsStore = useCardStore();
			const route = useRoute();

			const card = cardsStore.cards[route.params.id];

			return {
				card
			};
		},
	}
</script>



<template>
	<div v-if="card && card.question && card.answer">
		<h1>Carte</h1>
		<span>{{ card.question }}</span>
	</div>
</template>



<style lang="scss">
	// h1 {
	// 	color: red;
	// 	font-size: 500px;
	// }
</style>
