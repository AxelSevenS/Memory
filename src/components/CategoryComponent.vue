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
	<router-link :to="`/cards/list/${category.title}`">
		<div class="category__container" v-if="category">
			<div class="category--front">
				<h1>
					{{ category.title }}
				</h1>
			</div>
		</div>
	</router-link>

</template>



<style lang="scss">

	.category {
		&__container {
			width: 10rem;
			height: 10rem;
			border: 1px solid black;
			border-radius: 1rem;
			margin: 1rem;
		}
	}

</style>