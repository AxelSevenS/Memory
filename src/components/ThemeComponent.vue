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

	<div class="container__list">
		<router-link class="theme__link" :to="`/categories/list/${theme.id}`">
			<div class="theme__container" v-if="theme">
				<div class="theme-content">
					<h1>
						Theme : {{ theme.title }}
					</h1>
				</div>
			</div>
		</router-link>
		<router-link :to="`/themes/${theme.id}`">
			<button class="button-modify">Modifier</button>
		</router-link>
	</div>
</template>



<style scoped lang="scss">

	.theme {

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
		&-content :hover .theme__container {
			cursor: pointer;
			background-color: black;
			color: #f1f1f1;
		}
		&-link {
			text-decoration: none;
			color: white;
			:hover {
				color: black;
				background-color:white
			}

		}
	}

	.button-modify {
		padding: 25px;
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