<script lang="ts">
	import type { Dict } from '$lib/i18n/water/content';

	let { t }: { t: Dict } = $props();

	// Newsletter form: submit hides the form and shows the thanks line, exactly
	// like the original client.ts that toggled `hidden` between #news-form and
	// #news-thanks. No real submission - this is a parody product.
	let done = $state(false);
</script>

<footer class="site-footer">
	<div class="wrap">
		<div class="foot-grid">
			<div>
				<div class="foot-brand">
					<span class="drop">💧</span>
					<span class="name">Wet Water</span>
				</div>
				<p class="statement">{t.footer.statement}</p>
			</div>
			<div>
				<div class="news-label">{t.footer.newsletter}</div>
				<form
					class="news-form"
					hidden={done}
					onsubmit={(e) => {
						e.preventDefault();
						done = true;
					}}
				>
					<input type="email" required placeholder={t.footer.placeholder} />
					<button type="submit">{t.footer.subscribe}</button>
				</form>
				<div class="news-thanks" hidden={!done}>{t.footer.newsletterThanks}</div>
			</div>
		</div>
		<div class="foot-rule"></div>
		<div class="foot-bottom">
			<p class="legal">{t.footer.legal}</p>
			<a href="#top" class="back-top">{t.footer.backToTop}</a>
		</div>
	</div>
</footer>
