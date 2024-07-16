
<script setup>
	import { useCardStore } from '@/stores/cards';
	import { ref } from 'vue';

	const cardStore = useCardStore();

	const todaysCards = ref(cardStore.todaysCards);
	cardStore.$subscribe(() => {
		todaysCards.value = cardStore.todaysCards;
	})

</script>



<template>
	<div class="home__title">
		<h1>Bonjour !</h1>
	</div>
	<div v-if="todaysCards.length !== 0">
		<CardComponent v-for="card in todaysCards" :key="card.title" :card="card" :isQuiz="true" />
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
