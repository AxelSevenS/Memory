<script>
	import { ref } from 'vue';
	import { useCardStore } from '@/stores/cards';


	export default {
		name: 'CardComponent',
		props: [
			'card',
			'isQuiz'
		],

		setup() {
			const cardStore = useCardStore();
			const flipRef = ref(false);

			return {
				cardStore,
				flipRef,
			};
		},

		methods: {
			validateAnswer: (state) => (card) => {
				state.cardStore.validate(card.id);
			},

			invalidateAnswer: (state) => (card) => {
				state.cardStore.invalidate(card.id);
			},
		},
	}

</script>



<template>
	<div class="cards__container" v-if="card && card.question && card.answer">

		<h2 class="toggle-labels">
			<span color="primary">Retourne moi</span>
		</h2>

		<label class="toggle-label" :class="{'flipped': flipRef}">
			<input type="checkbox" placeholder="<" class="toggle-btn" v-model="flipRef" />

		</label>

		<div class="card__container">
			<div class="card__wrapper">

				<div class="card--front" @click="flipRef = !flipRef">
					<h1>
						{{ card.question }}
					</h1>
				</div>

				<div class="card--back">
					<div @click="flipRef = !flipRef">
						<h1>{{ card.answer }}</h1>

						<div class="card--back__media" v-if="card.answerMedia && card.answerMediaType">
							<img v-if="card.answerMediaType.startsWith('image')" :src="card.answerMedia" alt="image" />

							<video controls v-if="card.answerMediaType.startsWith('video')">
								<source :src="card.answerMedia" :type="card.answerMediaType">
							</video>

							<audio controls v-if="card.answerMediaType.startsWith('audio')" :src="card.answerMedia"></audio>
						</div>
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
		}

		&__wrapper {
			width: 100%;
			height: 100%;
			transform-style: preserve-3d;
			-webkit-transform-style: preserve-3d;
			transition: all 600ms ease-out;
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
	}



	.toggle {

		&-btn {
			width: 10rem;
			display: none;
		}

		&-label {
			position: relative;
			display: block;
			width: 60px;
			height: 20px;
			z-index: 10;

			padding: 0;
			margin-top: 10px;
			margin-bottom: calc(10px + 1rem);
			text-align: center;
			border-radius: 8px;
			cursor: pointer;
			background-color: #f1f1f1;

			&:before {
				position: absolute;
				display: block;
				top: -10px;
				left: -10px;
				width: 40px;
				height: 40px;

				border-radius: 50%;
				color: black;
				background-color: #f1f1f1;
				content: '>';
				line-height: 36px;
				text-align: center;
				font-size: 24px;
				transition: all 0.5s ease;
			}


			&.flipped {
				&:before {
					transform: translateX(44px) rotate(180deg);
				}

				& ~ .card__container > .card__wrapper {
					transform: rotateY(180deg);
				}
			}
		}
	}
</style>