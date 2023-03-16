<script lang="ts">
	import './colors.css';
	import { createEventDispatcher } from 'svelte';

	let className: string = undefined;
	export { className as class };
	export let name: string = undefined;
	export let type: 'text' | 'password' = 'text';
	export let placeholder: string = undefined;
	export let autocomplete: 'off' | 'on' = 'off';
	export let movePlaceholder = true;
	export let value = '';
	export let pattern: RegExp = undefined;
	export let errorMessage = 'Invalid input';
	export let required = false;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	let input: HTMLInputElement;
	let error = false;

	let placeholderString = required ? `${placeholder} *` : placeholder;

	$: input,
		(() => {
			if (!input) return;
			input.value = value;
		})();

	function emit(event: string) {
		return () => dispatch(event, input.value);
	}

	function onChange() {
		value = input.value;
		validate();
		emit('change');
	}

	function validate() {
		error = pattern && !pattern.test(input.value);

		if (error) return;

		error = required && input.value === '';
	}
</script>

<div class={`custom-input ${className ?? ''}`} class:disabled>
	<div class="input-wrapper" class:error>
		{#if movePlaceholder}
			<span class:up={value} class:error>{placeholderString}</span>
		{/if}
		<input
			bind:this={input}
			class:error
			{name}
			{type}
			{autocomplete}
			{disabled}
			pattern={pattern?.toString()}
			placeholder={!movePlaceholder && placeholder ? placeholder : undefined}
			on:change={onChange}
			on:input={emit('input')}
			on:blur={validate}
		/>
	</div>
	<div class="error-message" hidden={!error}>{required && !value ? 'This field is required.' : errorMessage}</div>
</div>

<style scoped>
	.custom-input {
		padding: 3px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		font-family: inherit;
	}

	.custom-input.disabled input {
		cursor: not-allowed;
	}

	.custom-input.disabled .input-wrapper {
		border: none;
	}

	span {
		position: absolute;
		top: 0;
		left: 0;
		color: var(--faint-color);
		transition: all 0.2s ease-out;
		font-size: inherit;
		pointer-events: none;
	}

	span.up {
		transform: translateY(-110%);
		font-size: 0.7em;
	}

	span.error {
		color: var(--error-color);
	}

	span:has(input:focus) {
		color: red;
	}

	span:has(+ input:focus) {
		color: var(--hover-color);
		transform: translateY(-100%);
		font-size: 0.7em;
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
		font-family: inherit;
	}

	.input-wrapper {
		width: 100%;
		position: relative;
		border-bottom: 1px solid var(--faint-color);
	}

	.input-wrapper.error {
		border-bottom: 1px solid var(--error-color);
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

	.error-message {
		margin-top: 0.2em;
		color: var(--error-color);
		text-align: left;
		width: 100%;
		font-size: 0.7em;
		transition: 0.3s ease-in-out;
	}

	.disabled {
		background: var(--back-color);
		border-radius: 4px;
		cursor: not-allowed;
	}
</style>
