<script>
	import { useCardStore } from '@/stores/cards';

	export default {
		name: 'HomePage',
		props: {},
		setup() {
			const cardStore = useCardStore();

			const today = Date.now() / 1000 / 60 / 60 / 24;

			const todaysCards = cardStore.cards.filter(card => {
				if (card.lastReviewDay === null) return true;
				const lastReviewDay = new Date(card.lastReviewDay).getTime() / 1000 / 60 / 60 / 24;
				const dateOffset = Math.floor(today - lastReviewDay);

				return dateOffset >= Math.pow(2, card.level);
			});

			console.log(todaysCards);
		},
	}
</script>



<template>
	<div>
		<h1>Home</h1>
	</div>
</template>



<style lang="scss">
	// h1 {
	// 	color: red;
	// 	font-size: 500px;
	// }
</style>
