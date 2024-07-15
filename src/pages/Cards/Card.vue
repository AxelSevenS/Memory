<script>
	import { useRoute, useRouter } from 'vue-router';
	import { useCardStore } from '@/stores/cards';

	export default {
		name: 'CardPage',
		setup() {
			const cardStore = useCardStore();
			const router = useRouter();
			const route = useRoute();

			const cardId = route.params.cardId;
			const card = cardStore.cards[cardId];

			if (! card) router.push('/');

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
</style>
