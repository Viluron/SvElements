<script lang="ts">
	import { setContext } from 'svelte';
	import { setThemeColors, Svelements, type Theme } from '../styles';

	export let theme: Theme = {};

	$: theme, (() => setThemeColors(theme))();

	setThemeColors(theme);

	setContext('__svelements__', Svelements);
</script>

<slot />
