<script>
	export default {
		name: 'ThemePage',
		props: {},
	}


</script>



<template>
	<template>
	<section>
		<form class="create-theme" @submit.prevent="addTheme">
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
		<div v-if="newTheme.title">
			<p>Theme created: {{ newTheme.title }}</p>
		</div>
	</section>
</template>
</template>



<style lang="scss">
	// h1 {
	// 	color: red;
	// 	font-size: 500px;
	// }
</style>
