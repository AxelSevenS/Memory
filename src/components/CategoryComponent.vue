<script>
	import { ref } from 'vue';

	export default {
		name: 'CategoryComponent',
		props: [
			'category',
		],

		setup() {
			const flipRef = ref(false);

			return {
				flipRef
			};
		}
	}

</script>



<template>
	<div class="container__list">
		<router-link :to="`/cards/list/${category.id}`">
			<div class="category__container" v-if="category">
				<div class="category--front">
					<h1>
						{{ category.title }}
					</h1>
				</div>
			</div>
		</router-link>
		<router-link :to="`/category/${category.title}`">
			<button class="button-modify">Modifier</button>
		</router-link>
	</div>
</template>




<style lang="scss">

	.category {
		&__container {
			margin: 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20rem;
			height: 5rem;
			-webkit-transform-style: preserve-3d;
			transform-style: preserve-3d;
			perspective: 1500px;
			color: black;
		}
	}
	.container {
		&__list {
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #f1f1f1;
			border: 1px solid black;
			border-radius: 2px;
			margin: 1rem;
		}
	}

</style>