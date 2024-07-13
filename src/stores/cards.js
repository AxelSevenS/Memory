// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
	state: () => ({
		cards: [],
	}),

	actions: {
		addCard(card) {
			if (card.answerMedia) {
				const reader = new FileReader();

				reader.onload = (e) => {
					card.answerMediaType = card.answerMedia.type;
					card.answerMedia = e.target.result;
					this.cards.push(card);
				};
				reader.readAsDataURL(card.answerMedia);
			} else {
				this.cards.push(card);
			}

			console.log('Carte ajoutée: ', card);
		},

		removeCard(card) {
			const index = this.cards.indexOf(card);
			if (index >= 0) {
				console.log('Carte retirée: ', card);
				this.cards.splice(index, 1);
			}
		},

		modifyCard(card) {
			console.log(card);
		}
	},

	getters: {
		totalCards: (state) => {
			console.log('Nombre de cartes: ', state.cards);
			return state.cards.length;
		}
	},

	persist: {
		storage: sessionStorage,
		paths: ['cards'],
	},
})

