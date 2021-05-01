/* src/News.svelte generated by Svelte v3.38.0 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../web_modules/svelte/internal.js";

function create_fragment(ctx) {
	let div2;

	return {
		c() {
			div2 = element("div");

			div2.innerHTML = `<div class="container mx-auto bg-blue-300 rounded-b-md p-4 text-gray-900"><div class="bg-blue-600 rounded-md px-3 py-2 mb-3 font-bold text-gray-200">4/28/21</div>
        Some vendor prices were updated, recipes like Codex of the Still Mind are
        much more accurate now.</div>`;

			attr(div2, "class", "bg-gray-900 px-4 md:px-0");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

class News extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default News;