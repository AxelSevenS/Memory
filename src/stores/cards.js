// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
	state: () => ({
		cards: [],
	}),

	actions: {
		addCard(card , category) {
			if (card.answerMedia) {
				const reader = new FileReader();

				reader.onload = (e) => {
					card.answerMediaType = card.answerMedia.type;
					card.answerMedia = e.target.result;
				};
				reader.readAsDataURL(card.answerMedia);
			}
			this.cards.push({
				...card,
				level: 0,
				category: category,
				lastReview: null,
			});

			console.log('Carte ajoutée: ', card);
		},

		removeCard(card) {
			const index = this.cards.indexOf(card);

			if (index >= 0) {
				console.log('Carte retirée: ', card);
				delete this.cards[index];
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

