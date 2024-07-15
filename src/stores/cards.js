// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia';
import { useConfigStore } from './config';

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
			const preferenceStore = useConfigStore();

			const card = this.cards[id];
			if (! card) return;

			card.level += 1;
			if (card.level > preferenceStore.maxCardLevel) {
				this.removeCard(card);
				return;
			}
			card.lastReview = new Date(Date.now());
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
			const preferenceStore = useConfigStore();
			const cardsPerDay = preferenceStore.cardsPerDay;
			console.log(cardsPerDay);

			const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

			const today = Math.floor(Date.now() / MS_IN_A_DAY);

			const shouldReviewCard = (card) => {
				if (card.lastReview === null) return true;

				const lastReviewDay = Math.floor(new Date(card.lastReview).getTime() / MS_IN_A_DAY);
				const dayOffset = today - lastReviewDay;

				return dayOffset === 0 || dayOffset >= Math.pow(2, card.level);
			};

			const cardsToReview = Object.values(state.cards)
				.filter(shouldReviewCard)
				.slice(0, cardsPerDay)
				.filter(card => {
					if (card.lastReview === null) return true;

					const lastReviewDay = Math.floor(new Date(card.lastReview).getTime() / MS_IN_A_DAY);
					const dayOffset = today - lastReviewDay;

					return dayOffset >= Math.pow(2, card.level);
				});

			return cardsToReview;
		},
	},

	persist: {
		storage: localStorage,
		paths: ['cards'],
	},
})

