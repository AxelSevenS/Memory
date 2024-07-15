<script>
	import { ref } from 'vue';

	export default {
		name: 'ThemeComponent',
		props: [
			'theme',
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
	<router-link :to="`/categories/list/${theme.title}`">
		<div class="theme__container" v-if="theme">
			<div class="theme-content">
				<h1>
					{{ theme.title }}
				</h1>
			</div>
		</div>
	</router-link>
</template>



<style scoped lang="scss">

	.theme {

		&__container {
			margin: 1rem;
			display: flex;
			justify-content: center;
			width: 10rem;
			height: 5rem;
			-webkit-transform-style: preserve-3d;
			transform-style: preserve-3d;
			perspective: 1500px;
			background-color: (var(--color-primary));
			background-color: (var(--color-primary));
			color: #f1f1f1;

		}
		&-content :hover .theme__container {
			cursor: pointer;
			background-color: black;
			color: #f1f1f1;
		}
	}
</style>