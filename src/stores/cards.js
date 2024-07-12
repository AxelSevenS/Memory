// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia'
export const useCardStore = defineStore('cards', {
  state: () => ({
		cards:[],
		}),

	actions: {
		addCard(card){
		this.cards.push(card)
    console.log('Carte ajoutée:', card)
		},
		saveCards(){
			localStorage.setItem(this.card, JSON.stringify(this.cards))
		}
	},

	getters: {
		totalCards: (state) => {
			console.log('Nombre de cartes:', state.cards)
			return state.cards.length
		}
	},
	persist: {
    enabled: true,
  },
})

