<script lang="ts">
	export let icon: string;
	export let color = 'currentColor';
	export let size = 'unset';
</script>

<span class="material-symbols-outlined" style={`color: ${color}; font-size: ${size}`}>{icon}</span>

<style scoped>
	span {
		color: currentColor;
	}
</style>
