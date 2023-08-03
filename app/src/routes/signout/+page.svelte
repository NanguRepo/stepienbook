<script lang="ts">
	import { browser } from '$app/environment';
	import { account } from '../../components/stores';
	if (browser) {
		$account = {
			username: '',
			password: ''
		};
		window.open('/', '_self');
	}
</script>
