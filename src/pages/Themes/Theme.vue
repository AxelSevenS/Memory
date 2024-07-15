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
		</form>
		<div v-if="newTheme.title">
			<p>Theme created: {{ newTheme.title }}</p>
		</div>
	</section>
</template>
</template>



<style lang="scss">
</style>
