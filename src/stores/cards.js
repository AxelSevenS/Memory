// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
	state: () => ({
		cards: {},
	}),

	actions: {
		addCard(card, category) {
			const id = encodeURIComponent(card.question);

			const newCard = {
				...card,
				id: id,
				level: 0,
				category: category,
				lastReview: null,
			};

			if (newCard.answerMedia) {
				const reader = new FileReader();

				reader.onload = (e) => {
					newCard.answerMediaType = newCard.answerMedia.type;
					newCard.answerMedia = e.target.result;
					this.cards[id] = newCard;
				};
				reader.readAsDataURL(newCard.answerMedia);
			}
			else {
				this.cards[id] = newCard;
			}


			console.log('Carte ajoutée: ', card);
		},

		removeCard(card) {
			console.log('Carte retirée: ', card);
			delete this.cards[card.id];
		},


		validate(id) {
			console.log(this.cards);
			const card = this.cards[id];
			console.log(card);
			if (! card) return;

			card.level += 1;
			if (card.level >= 7) {
				this.removeCard(card);
				return;
			}
			card.lastReview = new Date(Date.now());
			console.log(card);
		},

		invalidate(id) {
			const card = this.cards[id];
			if (! card) return;

			card.level = 0;
			card.lastReview = new Date(Date.now());
		}
	},

	getters: {
		totalCards: (state) => {
			return state.cards.length;
		},

		fromCategory: (state) => (category) => {
			return Object.keys(state.cards)
				.filter( id => {
					const card = state.cards[id];
					return card.category === category;
				})
				.map( id => state.cards[id] );
		},

		todaysCards: (state) => {
			const today = Date.now() / 1000 / 60 / 60 / 24;

			return Object.keys(state.cards)
				.filter( id => {
					const card = state.cards[id];

					if (card.lastReview === null) return true;

					const lastReview = new Date(card.lastReview).getTime() / 1000 / 60 / 60 / 24;
					const dateOffset = Math.floor(today - lastReview);

					return dateOffset >= Math.pow(2, card.level);
				})
				.map( id => state.cards[id] );
		},
	},

	persist: {
		storage: sessionStorage,
		paths: ['cards'],
	},
})

