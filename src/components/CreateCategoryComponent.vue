<script>

	export default {
		name: 'CreateCategoryComponent',
		props: { }
	}

</script>



<template>
	<div>
		<h1>CreateCategories</h1>
		<form>
			<label for="name">Name: </label>
			<input type="text" id="name" v-model="newCategories.name" />

			<label for="description">Description: </label>
			<input type="text" id="description" v-model="newCategories.description" />

			<button type="submit" @click="addCategories">Submit</button>
		</form>
	</div>
</template>



<style lang="sccs">
	#name {
		font-weight: bold;
		color: #2c3e50;
		font-family: 'Russo One', sans-serif;

	}
	#description {
		font-weight: bold;
		color: #2c3e50;
		font-family: 'Russo One', sans-serif;
	}
</style>