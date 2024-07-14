<script>
	import { ref } from 'vue';
	import { useCardStore } from '@/stores/cards';

	export default {
		name: 'CreateCardComponent',
		props: {},

		setup() {
			const cardsStore = useCardStore();

			const newCard = ref({
				questionTitle: '',
				questionContent: '',

				answerMedia: null,
			});

			const fileInputRef = ref(null);


			const updateMedia = (event) => {
				newCard.value.answerMedia = event.target.files[0];
			};

			const addCard = () => {
				cardsStore.addCard({ ...newCard.value });

				newCard.value.questionTitle = '';
				newCard.value.questionContent = '';

				newCard.value.answerMedia = null;
				if (fileInputRef.value) fileInputRef.value.value = null;
			};

			return {
				newCard,
				fileInputRef,

				addCard,
				updateMedia,

				cards: cardsStore.cards,
			};
		}
	};
</script>

<template>
	<div class="create-card">
		<section class="create-card__child">
			<form class="create-card__child-form" @submit.prevent="addCard">
				<h1>Ajouter une Carte</h1>
				<label for="title">Titre: </label>
				<input type="text" id="title" v-model="newCard.questionTitle" required />

				<label for="description">Contenu: </label>
				<input type="text" id="description" v-model="newCard.questionContent" required />

				<label for="media">Média: </label>
				<input type="file" id="media" ref="fileInputRef" @change="updateMedia" accept="video/*,audio/*,image/*" />

				<button type="submit">Valider</button>

			</form>
		</section>

		<ul>
			<li v-for="card in cards" :key="card.title">
				<CardComponent :card="card" />
			</li>
		</ul>
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
			font-family: Russo One, sans-serif;

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
				font-family: Russo One, sans serif;
				display: flex;
				justify-content: baseline;

			}

			& input {
				padding: 0,5rem;
				width: 60%;
				height: 3rem;
				margin: 1rem 0;
				border-radius: 5px;
				border: 1px solid #ccc;
				color: #42b983;
				font-size: 1.5rem;
				font-family: Russo One, sans-serif;
			}

			& input[type="file"] {
				padding: 0,5rem;
				width: 60%;
				height: 3rem;
				margin: 1rem 0;
				// border-radius: 5px;
				// border: 1px solid #ccc;
				// color: #42b983;
				font-size: 1.5rem;
				font-family: Russo One, sans-serif;

			}

			& button {
				color: white;
				width: 50%;
				height: 3rem;
				margin: 1rem 0;
				border-radius: 5px;
				border: 1px solid #ccc;
				background-color: #42b983;
				font-size: 1.5rem;
				font-weight: bold;
				font-family: Russo One, sans serif;
				&:hover {
					background-color: #2c3e50;
					cursor: pointer;
				}
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
					font-family: Russo One, sans-serif;
				}
				& label {
					font-size: 1.5rem;
					font-weight: bold;
					font-family: Russo One, sans-serif;
				}
			}
		}
	}
</style>