<script setup>
	import { ref } from 'vue';
	import { useCardStore } from '@/stores/cards';
	import { defineProps } from 'vue';
	import { MS_IN_A_DAY } from '@/utility';

	// Définir les props
	const props = defineProps({
		card: Object,
		isQuiz: Boolean,
	});

	const alreadyReviewed = (card) => {
		if (card.lastReview === null) return false;

		const today = new Date(Date.now());

		const lastReviewDay = Math.floor(new Date(card.lastReview).getTime() / MS_IN_A_DAY);
		const dayOffset = today - lastReviewDay;

		return dayOffset !== 0;
	};

	const flipRef = ref(false);
	const wasReviewed = ref(alreadyReviewed(props.card));

	const cardStore = useCardStore();
	cardStore.$subscribe(() => {
		wasReviewed.value = alreadyReviewed(props.card)
		console.log(wasReviewed);
	})

	const validateAnswer = (card) => {
		cardStore.validate(card.id);
	};

	const invalidateAnswer = (card) => {
		cardStore.invalidate(card.id);
	};

	const flipCard = () => {
		flipRef.value = ! flipRef.value;
	};
</script>




<template>
	<div class="cards__container" v-if="! (isQuiz && wasReviewed) && card && card.question && card.answer">

		<div class="card__container">
			<div class="card__wrapper" :class="{'flipped': flipRef}">

				<div class="card--front">
					<h1>
						{{ card.question }}
					</h1>

					<button @click="flipCard">Retourner</button>
				</div>

				<div class="card--back">
					<h1>{{ card.answer }}</h1>

					<div class="card--back__media" v-if="card.answerMedia && card.answerMediaType">
						<img v-if="card.answerMediaType.startsWith('image')" :src="card.answerMedia" alt="image" />

						<video controls v-if="card.answerMediaType.startsWith('video')">
							<source :src="card.answerMedia" :type="card.answerMediaType">
						</video>

						<audio controls v-if="card.answerMediaType.startsWith('audio')" :src="card.answerMedia"></audio>
					</div>

					<div v-if="isQuiz">
						<button @click="validateAnswer(card)">Correct</button>
						<button @click="invalidateAnswer(card)">Pas Correct</button>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>





<style scoped lang="scss">

	.cards__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 2rem;

	}
	.card {
		&__container {
			width: 50rem;
			height: 50rem;
			-webkit-transform-style: preserve-3d;
			transform-style: preserve-3d;
			perspective: 1500px;
			border: 0.5rem solid black;
			border-radius: 1rem;
		}

		&__wrapper {
			width: 100%;
			height: 100%;
			transform-style: preserve-3d;
			-webkit-transform-style: preserve-3d;
			transition: all 600ms ease-out;

			&.flipped {
				transform: rotateY(180deg);
			}
		}

		&--front, &--back {
			backface-visibility: hidden;
			width: 100%;
			height: 100%;
			position: absolute;
			border-radius: 6px;
			transform-style: preserve-3d;
			-webkit-transform-style: preserve-3d;
			// padding: 1rem;
			overflow: hidden;
			background-color: #f1f1f1;

			& > * {
				transform: translate3d(0, 0, 65px) perspective(100px);
			}
		}

		&--back {
			transform: rotateY(180deg);

			&__media {
				img, video, audio {
					// padding:2rem;
					object-fit: cover;
					width: 75%;
					height: 75%;
				}
			}
		}
		&--front {
			& > h1 {
				font-size: 2rem;
				text-align: center;
				padding: 1rem;

			}
		}
	}



	.toggle {

		&-btn {
			width: 10rem;
			display: none;
		}
	}
</style>