import { createFileRoute } from "@tanstack/react-router";

import avatar from "../assets/avatar.png";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="container prose prose-invert min-h-[100vh] flex justify-center items-center">
			<div className="bg-slate-900 text-white/100 rounded p-6 h-fit flex-1 outline outline-1 outline-slate-850">
				<section>
					<div className="max-w-[700px]">
						<hgroup className="mb-4 order-1">
							<h2 className="font-serif text-2xl">Jeroen Peeters</h2>
							<h5 className="text-white/60">Frontend Developer</h5>
						</hgroup>
						<p className="text-lg font-serif">Hello there 👋</p>
						<p>
							My name is Jeroen Peeters, I'm a Frontend Developer at{" "}
							<a href="https://twipemobile.com">Twipe</a>. My focus is on
							product development using React, React Native and Typescript.
						</p>
						<hgroup>
							<h3 className="text-white/85 text-lg font-serif mt-4">
								Experience
							</h3>
						</hgroup>
						<p>
							At <a href="/resume">/resume</a> you can find an interactive
							version of my résumé.
						</p>
						<p>
							A PDF version can be found at{" "}
							<a href="/resume">{`{{coming soon}}`}</a>.
						</p>
						<hgroup>
							<h3 className="text-white/85 text-lg font-serif mt-4">
								Get in touch
							</h3>
						</hgroup>
						<p>
							Via email:{" "}
							<a href="mailto:contact@jeroenpeeters.be">
								contact@jeroenpeeters.be
							</a>
						</p>
						<p className="flex flex-row gap-2">
							<a href="https://twitter.com/jeroenbpeeters">Twitter</a>{" "}
							<span>|</span>
							<a href="linkedin.com/in/jeroenptrs">LinkedIn</a>
						</p>
					</div>
					<div className="avatar">
						<img
							className="rounded"
							src={avatar}
							alt="Photograph taken of me during a conference talk"
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
