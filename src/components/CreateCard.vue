<script>

import { ref } from 'vue';
import { useCardStore } from '@/stores/cards';
// import { saveCards } from '@/stores/cards';

export default {
setup(){
	const cardsStore = useCardStore();
	const newCard = ref({
		title: '',
		description: ''
	});

	const addCard = () => {
		cardsStore.addCard({...newCard.value});
		newCard.value.title = '';
		newCard.value.description = '';

	}

	return{
		newCard,
		addCard,

		cards: cardsStore.cards,

	}
}

};
</script>

/**************************************************************/

<template>
  <div class="create__card">
    <h1>Create a Card</h1>
    <section class="create__card--child">
      <form @submit.prevent="addCard">
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="newCard.title" />
        <label for="description">Description :</label>
        <input type="text" id="description" v-model="newCard.description" />
        <!-- <label>Média:</label>
        <input type="file" id="media" /> -->
        <button type="submit" @click="saveCards">Submit</button>
      </form>
    </section>
	<ul>
		<li v-for="card in cards" :key="card.title">
			{{ card.title }}: {{ card.description }}
		</li>
	</ul>
  </div>
</template>

/**************************************************************/

<style lang="scss">
.create__card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
}

.create__card--child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.create__card--child {
  & label {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: Russo One, sans serif;
  }
  & input {
    width: 80%;
    height: 3rem;
    margin: 1rem 0;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  & input[type="file"] {
    display: flex;
    justify-content: center;
    width: 40%;
    height: 3rem;
    margin: 1rem 0;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  & button {
    width: 40%;
    height: 2rem;
    margin: 1rem 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: Russo One, sans serif;
  }
}
</style>
