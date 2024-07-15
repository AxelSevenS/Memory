<script>
	import { useCardStore } from '@/stores/cards';
	import { ref } from 'vue';

	export default {
		name: 'HomePage',
		props: {},
		setup() {
			const cardStore = useCardStore();

			const todaysCards = ref(cardStore.todaysCards);
			cardStore.$subscribe(() => {
				todaysCards.value = cardStore.todaysCards;
			})

			return {
				todaysCards
			};
		},
	}
</script>



<template>
	<div class="home__title">
		<h1>Bonjour !</h1>
	</div>
	<div v-if="todaysCards.length !== 0">
		<li v-for="card in todaysCards" :key="card.title">
			<CardComponent :card="card" :isQuiz="true" />
		</li>
	</div>
	<h2 v-else>
		Il n'y a plus rien à réviser pour aujourd'hui ! :)
	</h2>
</template>



<style lang="scss">

	.home__title > h1 {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;

	}


</style>
