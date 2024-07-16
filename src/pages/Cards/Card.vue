<script>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useCardStore } from '@/stores/cards';

	export default {
		name: 'CreateCardPage',
		props: {},

		setup() {
			const cardStore = useCardStore();
			const router = useRouter();
			const route = useRoute();

			const cardId = route.params.cardId;
			const card = cardStore.cards[cardId];

			if (! card) router.push('/');


			const editedCard = ref({
				question: card.question,

				answer: card.answer,
				answerMedia: null,
			});

			const fileInputRef = ref(null);


			const updateMedia = (event) => {
				editedCard.value.answerMedia = event.target.files[0];
			};

			const updateCard = () => {
				cardStore.updateCard(cardId, editedCard.value);
			};

			return {
				editedCard,
				fileInputRef,

				updateCard,
				updateMedia,

				card,
			};
		}
	};
</script>

<template>
	<router-link :to="`/cards/list/${card.category}`">
		<button>Retour</button>
	</router-link>
	<section>
		<form class="create-card" @submit.prevent="updateCard">
			<h1>Modifier la Carte</h1>

			<label for="title">Question: </label>
			<input type="text" id="title" v-model="editedCard.question" required />


			<label for="description">Réponse: </label>
			<input type="text" id="description" v-model="editedCard.answer" required />

			<label for="media">Média: </label>
			<input type="file" id="media" ref="fileInputRef" @change="updateMedia" accept="video/*,audio/*,image/*" />


			<button type="submit">Valider</button>
			<!-- <CardList :cards="cards" /> -->
		</form>
	</section>
</template>



<style lang="scss" scoped>
</style>