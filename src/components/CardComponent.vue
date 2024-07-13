<script>
	import { ref } from 'vue';

	export default {
		name: 'CardComponent',
		props: [
			'card',
		],

		setup() {
			const flipRef = ref(false);

			return {
				flipRef
			};
		}
	}

</script>



<template v-if="card">
	<h6 class="toggle-labels">
		<span color="primary">Retourner</span>
	</h6>

	<label class="toggle-label" :class="{'flipped': flipRef}">
		<input type="checkbox" class="toggle-btn" v-model="flipRef" />
	</label>

	<div class="card__container">
		<div class="card__wrapper">

			<div class="card--front">
				<h1 v-if="card.questionTitle">
					{{ card.questionTitle }}
				</h1>
				<h2 v-if="card.questionContent">
					{{ card.questionContent }}
				</h2>
			</div>

			<div class="card--back">
				<h1 v-if="card.answerTitle">
					{{ card.answerTitle }}
				</h1>
				<h2 v-if="card.answerContent">
					{{ card.answerContent }}
				</h2>

				<div class="card--back__media" v-if="card.answerMedia && card.answerMediaType">
					<img v-if="card.answerMediaType.startsWith('image')" :src="card.answerMedia" alt="image" />

					<video controls v-if="card.answerMediaType.startsWith('video')">
						<source :src="card.answerMedia" :type="card.answerMediaType">
					</video>

					<audio controls v-if="card.answerMediaType.startsWith('audio')" :src="card.answerMedia"></audio>
				</div>
			</div>
		</div>
	</div>

</template>



<style scoped lang="scss">

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
			padding: 1rem;
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
					padding:2rem;
					object-fit: cover;
					width: 75%;
					height: 75%;
				}
			}
		}
	}



	.toggle {

		&-btn {
			display: none;
		}

		&-label {
			position: relative;
			display: block;
			width: 60px;
			height: 16px;
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
				width: 36px;
				height: 36px;

				border-radius: 50%;
				color: black;
				background-color: #f1f1f1;
				content: '\eb4f';
				line-height: 36px;
				text-align: center;
				font-size: 24px;
				transition: all 0.5s ease;
			}


			&.flipped {
				&:before {
					transform: translateX(44px) rotate(-270deg);
				}

				& ~ .card__container > .card__wrapper {
					transform: rotateY(180deg);
				}
			}
		}
	}
</style>