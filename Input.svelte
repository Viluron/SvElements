<script lang="ts">
	import './colors.css';
	import { createEventDispatcher } from 'svelte';

	let className: string = undefined;
	export { className as class };
	export let name: string = undefined;
	export let type: 'text' | 'password' = 'text';
	export let placeholder: string = undefined;
	export let autocomplete: 'off' | 'on' = 'off';

	const dispatch = createEventDispatcher();

	let input: HTMLInputElement;

	function emit(event: string) {
		return () => dispatch(event, input.value);
	}
</script>

<div class={`custom-input ${className ?? ''}`}>
	<div class="input-wrapper">
		<input
			bind:this={input}
			{name}
			{type}
			{placeholder}
			{autocomplete}
			on:change={emit('change')}
			on:input={emit('input')}
		/>
		<div class="border" />
	</div>
</div>

<style scoped>
	.custom-input {
		padding: 3px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	input {
		border: none;
		background: transparent;
		font-size: inherit;
		color: var(--faint-color);
	}

	input:focus {
		outline: none;
		color: var(--text-color);
	}

	input::placeholder {
		color: var(--faint-color);
	}

	.input-wrapper {
		width: 100%;
		position: relative;
		border-bottom: 1px solid var(--faint-color);
	}

	.input-wrapper::after {
		content: '';
		position: absolute;
		width: 0%;
		height: 2px;
		bottom: -1px;
		left: 50%;
		transition: width 0.2s ease-out;
	}

	.input-wrapper::before {
		content: '';
		position: absolute;
		width: 0%;
		height: 2px;
		bottom: -1px;
		right: 50%;
		direction: ltr;
		transition: width 0.2s ease-out;
	}

	.input-wrapper:has(input:focus)::after {
		background-color: var(--hover-color);
		width: 50%;
		left: 50%;
		position: absolute;
		transition: width 0.2s ease-out;
	}

	.input-wrapper:has(input:focus)::before {
		background-color: var(--hover-color);
		width: 50%;
		position: absolute;
		transition: width 0.2s ease-out;
	}
</style>
