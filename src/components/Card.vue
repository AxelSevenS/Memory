<script>

  export default {
    name: 'CardView',
    props: { }
	}


</script>

<template>
	<p>CACA</p>
</template>

<style scoped lang="scss">

	$primary: var(--color-primary);
	$contrast-primary: var(--contrast-primary);
	$accent: var(--color-accent);
	$contrast-accent: var(--contrast-accent);

	section.book-spread {
		height: 100vh;
	}

	.background-picture{

		background-size: cover;
		background-repeat: no-repeat;
		height: 100%;
		width: 100%;
	}


	.authentication-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: fit-content;
	}


	#toggle-labels {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 4rem;
		text-align: center;
		margin: 0;
		z-index: 10;
		color: white;
		font-size: 2rem;
		font-family: "Russo One", sans-serif;
		flex-grow: 0;

    }


		#toggle-labels-ion-text {
			padding: 0 20px;
			font-weight: 700;
		}

		#toggle-labels-ion-text > * {
			min-width: fit-content;
		}

		#toggle-labels-ion-text:nth-child(0) {
			text-align: right;
		}

		#toggle-labels-ion-text:nth-child(1) {
			text-align: left;
		}


	#toggle-btn {
		display: none;
		z-index: 10;


		& + label {
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
			background-color: $primary;

			&:before {
				position: absolute;
				display: block;
				top: -10px;
				left: -10px;
				width: 36px;
				height: 36px;

				border-radius: 50%;
				color: $contrast-primary;
				background-color: $primary;
				font-family: 'unicons';
				content: '\eb4f';
				line-height: 36px;
				text-align: center;
				font-size: 24px;
				transition: all 0.5s ease;
			}
		}

		&:checked + label:before {
			transform: translateX(44px) rotate(-270deg);
		}

		&:checked ~ .card__container > .card__wrapper {
			transform: rotateY(180deg);
		}
	}

	.card__container {
		width: 30vw;
		max-width: 100%;
		height: 65vh;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		perspective: 1500px;
	}

	.card__wrapper {
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		-webkit-transform-style: preserve-3d;
		transition: all 600ms ease-out;
	}

	.card--front, .card--back {
		backface-visibility: hidden;
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 6px;
		transform-style: preserve-3d;
		-webkit-transform-style: preserve-3d;
		padding: 1rem;
		overflow: hidden;

		& > form.grid {
			transform: translate3d(0, 0, 65px) perspective(100px);

			& .grid__container {
				grid-template-columns: repeat(2, 1fr);
			}
		}
	}
	.card--back {
		transform: rotateY(180deg);


	}


	mat-card-title.login-title{
		color: #24265A;
		font-size: 2.5rem;

	}
</style>
