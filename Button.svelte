<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let visible: boolean = true;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let text: string = '';
	export let icon: string = undefined;
</script>

<button hidden={!visible} {type} on:click={() => dispatch('click')}>
	<span>
		{#if icon}
			<Icon {icon} />
		{:else}
			{text}
		{/if}
	</span>
</button>

<style scoped>
	button {
		background: var(--gradient);
		border-radius: 4px;
		color: var(--faint-color);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1px;
		border: none;
		width: 100%;
	}

	button > span {
		font-size: 1.2em;
		font-weight: bold;
		height: 2.5em;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--boxes-color);
		transition: 0.3s;
		border-radius: 4px;
	}

	button:hover {
		cursor: pointer;
	}

	button:hover > span {
		background: transparent;
		color: var(--text-color);
	}
</style>
