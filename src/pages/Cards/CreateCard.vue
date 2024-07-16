<script>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useCardStore } from '@/stores/cards';
	import { useCategoryStore } from '@/stores/categories';

	export default {
		name: 'CreateCardPage',
		props: {},

		setup() {
			const cardStore = useCardStore();
			const categoryStore = useCategoryStore();
			const router = useRouter();
			const route = useRoute();

			const categoryId = route.params.categoryId;
			const category = categoryStore.categories[categoryId];

			if (! category) router.push('/');


			const newCard = ref({
				question: '',

				answer: '',
				answerMedia: null,
			});

			const fileInputRef = ref(null);


			const updateMedia = (event) => {
				newCard.value.answerMedia = event.target.files[0];
			};

			const addCard = () => {
				const addedCard = cardStore.addCard(newCard.value, categoryId);

				router.push(`/cards/${addedCard.id}`)

				newCard.value.question = '';

				newCard.value.answer = '';
				newCard.value.answerMedia = null;
				if (fileInputRef.value) fileInputRef.value.value = null;
			};

			return {
				newCard,
				fileInputRef,

				addCard,
				updateMedia,

				categoryId,
			};
		}
	};
</script>

<template>
	<router-link :to="`/cards/list/${categoryId}`">
		<button>Retour</button>
	</router-link>
	<section>
		<form class="create-card" @submit.prevent="addCard">
			<h1>Ajouter une Carte</h1>

			<label for="title">Question: </label>
			<input type="text" id="title" v-model="newCard.question" required />


			<label for="description">Réponse: </label>
			<input type="text" id="description" v-model="newCard.answer" required />

			<label for="media">Média: </label>
			<input type="file" id="media" ref="fileInputRef" @change="updateMedia" accept="video/*,audio/*,image/*" />


			<button type="submit">Valider</button>
			<!-- <CardList :cards="cards" /> -->
		</form>
	</section>
</template>



<style lang="scss" scoped>
</style>