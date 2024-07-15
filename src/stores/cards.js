// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia';
import { useConfigStore } from './config';
import { toKebabCase } from '@/utility';

export const useCardStore = defineStore('cards', {
	state: () => ({
		cards: {},
	}),

	actions: {
		addCard(card, category) {
			const id = toKebabCase(card.question);

			const newCard = this.cards[id] = {
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

			console.log('Carte ajoutée: ', card);

			return newCard;
		},

		removeCard(card) {
			console.log('Carte retirée: ', card);
			delete this.cards[card.id];
		},


		validate(id) {
			const configStore = useConfigStore();

			const card = this.cards[id];
			if (! card) return;

			card.level += 1;
			if (card.level > configStore.maxCardLevel) {
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
			const configStore = useConfigStore();
			const cardsPerDay = configStore.cardsPerDay;

			const MS_IN_A_DAY = 24 * 60 * 60 * 1000;

			const today = Math.floor(Date.now() / MS_IN_A_DAY);

			const shouldReviewCard = (card) => {
				if (card.lastReview === null) return true;

				const lastReviewDay = Math.floor(new Date(card.lastReview).getTime() / MS_IN_A_DAY);
				const dayOffset = today - lastReviewDay;

				return dayOffset === 0 || dayOffset >= Math.pow(2, card.level);
			};

			const alreadyReviewed = (card) => {
				if (card.lastReview === null) return true;

				const lastReviewDay = Math.floor(new Date(card.lastReview).getTime() / MS_IN_A_DAY);
				const dayOffset = today - lastReviewDay;

				return dayOffset >= Math.pow(2, card.level);
			};

			return Object.values(state.cards)
				.filter(shouldReviewCard) // Get all todo cards
				.sort((a, b) => b.level - a.level ) // Bigger level first
				.slice(0, cardsPerDay) // get only as many as the user wants
				.filter(alreadyReviewed); // remove the ones already reviewed today
		},
	},

	persist: {
		storage: localStorage,
		paths: ['cards'],
	},
})

