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