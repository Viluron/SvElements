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

	const dispatch = createEventDispatcher();

	let input: HTMLInputElement;
	let _value: String = '';

	function emit(event: string) {
		return () => dispatch(event, input.value);
	}

	function onChange() {
		_value = input.value;
		value = input.value;
		emit('change');
	}
</script>

<div class={`custom-input ${className ?? ''}`}>
	<div class="input-wrapper">
		{#if movePlaceholder}
			<span class:up={_value}>{placeholder}</span>
		{/if}
		<input
			bind:this={input}
			{name}
			{type}
			{autocomplete}
			placeholder={!movePlaceholder && placeholder ? placeholder : undefined}
			on:change={onChange}
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
		font-family: inherit;
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
		transform: translateY(-100%);
		font-size: 0.5em;
	}

	span:has(input:focus) {
		color: red;
	}

	span:has(+ input:focus) {
		color: var(--hover-color);
		transform: translateY(-100%);
		font-size: 0.5em;
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
