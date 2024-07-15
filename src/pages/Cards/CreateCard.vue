<script>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useCardStore } from '@/stores/cards';

	export default {
		name: 'CreateCardPage',
		props: {},

		setup() {
			const route = useRoute();
			const router = useRouter();

			const cardStore = useCardStore();


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
				cardStore.addCard(newCard.value, route.params.categoryId);

				router.push(`/cards/${newCard.value.question}`)

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
			};
		}
	};
</script>

<template>
	<div class="create-card">
		<section class="create-card__child">
			<form class="create-card__child-form" @submit.prevent="addCard">
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
	</div>
</template>



<style lang="scss" scoped>
	.create-card {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// height: 100vh;
		width: 100%;


		& h1 {
			font-size: 2rem;
			font-weight: bold;
			text-decoration: underline ;
			font-family: 'Russo One', sans-serif;

		}

		&__child {
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 50%;
			height: 50%;

			& label {
				margin-top: 1rem;

				font-weight: bold;
				font-family: 'Russo One', sans-serif;
				display: flex;
				justify-content: baseline;

			}

			&-form {
				margin-top: 2rem;
				width: 50%;
				background-color: #f1f1f1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;


				& h1 {
					font-size: 2rem;
					font-weight: bold;
					font-family: 'Russo One', sans-serif;
				}
				& label {
					font-size: 1.5rem;
					font-weight: bold;
					font-family: 'Russo One', sans-serif;
				}
			}
		}
	}
</style>