<script>
	import { ref } from 'vue';
	import { useThemeStore } from '@/stores/themes';
	import { useRouter } from 'vue-router';

	export default {
		name: 'CreateThemePage',
		props: {},

		setup() {
			const themeStore = useThemeStore();
			const router = useRouter();

			const newTheme = ref({
				title: '',
			});

			const addTheme = () => {
				themeStore.addTheme(newTheme.value);

				router.push(`/categories/list/${newTheme.value.title}`)

				newTheme.value.title = '';
			};

			return {
				newTheme,
				addTheme,


			};
		}
	};
</script>

<template>
	<div class="create-theme">
		<section class="create-theme__child">
			<form class="create-theme__child-form" @submit.prevent="addTheme">
				<h1>Ajouter un Thème</h1>

				<label for="title">Titre: </label>
				<input type="text" id="title" v-model="newTheme.title" required />

				<button type="submit">Valider</button>
				<div v-if="!newTheme.title">
					<p>Theme not created yet.</p>
				</div>
				<!-- <router-link :to="'/category/theme/' + newTheme.title">
					<button>Creer une categorie</button>
				</router-link> -->
			</form>
		</section>
	</div>
	<div v-if="newTheme.title">
		<p>Theme created: {{ newTheme.title }}</p>
	</div>
</template>



<style lang="scss" scoped>
	.create-theme {
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