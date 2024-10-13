import {
	Document,
	Image,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		fontFamily: "Helvetica",
		fontSize: 12,
		justifyContent: "flex-start",
		padding: 10,
	},
	name: {
		fontSize: 18,
	},
	position: {
		fontSize: 14,
		marginBottom: 4,
	},
	vertical: {
		flexDirection: "column",
		gap: 4,
	},
	horizontal: {
		flexDirection: "row",
		gap: 8,
	},
	spread: {
		justifyContent: "space-between",
	},
	link: {
		color: "rgb(24, 28, 37)",
		textDecoration: "underline",
		textDecorationColor: "rgb(24, 28, 37)",
		textDecorationStyle: "solid",
	},
	subdued: {
		opacity: 0.6,
	},
	subTitle: {
		fontSize: 14,
		marginTop: 8,
		marginBottom: 4,
	},
	section: {
		marginHorizontal: 10,
		marginVertical: 4,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
	},
	smallImage: {
		aspectRatio: 1,
		width: 25,
		height: 25,
		borderRadius: 4,
	},
	bold: {
		fontFamily: "Helvetica-Bold",
		fontWeight: "bold",
	},
	grow: {
		flexGrow: 1,
	},
	debug: {
		backgroundColor: "red",
	},
	topMargin: {
		marginBottom: 8,
	},
});

export default function Resume() {
	return (
		<Document>
			<Page size="A4" style={[styles.page, styles.vertical]}>
				<View style={[styles.section, styles.horizontal, styles.spread]}>
					<View style={styles.grow}>
						<View style={[styles.horizontal, styles.spread]}>
							<View style={styles.grow}>
								<Text style={styles.name}>Jeroen Peeters</Text>
								<Text style={[styles.position, styles.subdued]}>
									Frontend Developer
								</Text>
							</View>
							<View style={[styles.grow, styles.vertical]}>
								<Text>
									<Link
										style={styles.link}
										src="mailto:contact@jeroenpeeters.be"
									>
										contact@jeroenpeeters.be
									</Link>
								</Text>
								<Text>
									<Link
										style={styles.link}
										src="https://contact@jeroenpeeters.be"
									>
										https://jeroenpeeters.be
									</Link>
								</Text>
							</View>
						</View>
						<View style={[styles.horizontal, styles.spread]}>
							<View style={styles.grow}>
								<Text style={[styles.subTitle, styles.subdued]}>Education</Text>
								<Text style={styles.bold}>B.A.Sc. Information Science</Text>
								<Text>Hogeschool PXL | 2013 - 2017</Text>
							</View>
							<View style={styles.grow}>
								<Text style={[styles.subTitle, styles.subdued]}>
									Certificates
								</Text>
								<Text style={styles.bold}>Scrum Master Accreditation</Text>
								<Text>International Scrum Insitute | 2017</Text>
							</View>
						</View>
					</View>
					<Image style={styles.image} src="app/assets/avatar.png" />
				</View>
				<View style={[styles.section, styles.horizontal]}>
					<View style={styles.grow}>
						<Text style={[styles.subTitle, styles.subdued]}>Hobbies</Text>
						<View style={[styles.vertical, { maxWidth: "45%" }]}>
							<Text>
								<Text style={styles.bold}>Gaming</Text> - specifically games of
								the Pokémon franchise - has had a lasting impact on me and has
								been the main reason I'm in software development now.
							</Text>
							<Text>
								A thorough enjoyer of{" "}
								<Text style={styles.bold}>mechanical keyboards</Text>. My main
								boards right now are a Keychron Q9 Plus and a Wooting 60HE that
								have been heavily customized to my liking.
							</Text>
							<Text>
								If time allows it, I occasionally try out{" "}
								<Text style={styles.bold}>recipe testing</Text>,{" "}
								<Text style={styles.bold}>music production</Text> and{" "}
								<Text style={styles.bold}>3D printing</Text>.
							</Text>
						</View>
					</View>
					<View style={styles.grow}>
						<Text style={[styles.subTitle, styles.subdued]}>Interests</Text>
						<View style={[styles.vertical, { maxWidth: "45%" }]}>
							<Text>
								Outside of office hours I'm still actively engaged in software
								development, currently exploring{" "}
								<Text style={styles.bold}>local-first</Text> architecture using
								a personal habit tracker I made as a playground.
							</Text>
							<Text>
								For a while now, I have been a staunch supporter of the{" "}
								<Text style={styles.bold}>PWA</Text>
								movement. When given the opportunity I would love to explore it
								further and fully!
							</Text>
							<Text>
								At different workplaces, I've built up experience with and
								remain incredibly interested in{" "}
								<Text style={styles.bold}>Agile Processes, UI/UX and DX</Text>.
							</Text>
						</View>
					</View>
				</View>
				<View style={[styles.section, styles.vertical]}>
					<Text style={[styles.subTitle, styles.subdued]}>Skills</Text>
					<Text>
						<Text style={styles.bold}>Experienced:</Text> React, Typescript,
						React Native, CSS/Tailwind/Styled Components, Zustand/Redux, Node,
						{"\n"}Firebase, Git
					</Text>
					<Text>
						<Text style={styles.bold}>Exploring:</Text> Style Dictionary, DTCG
						Design Tokens, Postgres, InstantDB, Cloudflare Workers, Cloudflare
						D1, Tinybase
					</Text>
					<Text>
						<Text style={styles.bold}>Been a while:</Text> Go, MobX, Electron
					</Text>
				</View>
				<View style={[styles.section, styles.vertical]}>
					<Text style={[styles.subTitle, styles.subdued]}>
						Professional Experience
					</Text>
					<Experience
						employer="Twipe"
						duration="May 2021 - Present"
						position="Frontend Developer"
						src="pdf/assets/twipe_logo.jpeg"
					>
						<View style={styles.vertical}>
							<Text>
								I joined Twipe's React Native team in 2021. My goal from the
								start was to help modernize their approach to both their web and
								mobile products, potentially even consolidating them. Being a
								passionate React and Typescript advocate, this is where I grew
								to love React Native as well.
							</Text>
							<Text>
								At Twipe I've had the pleasure of spearheading multiple key
								features, but the ones I'm most proud of are the suite of native
								audio playback (podcasts, tts, ...) and Dark Mode (which was a
								massive undertaking for an app hardcoded to Light Mode!) which
								came coupled with the introduction of a shareable Design System.
							</Text>
						</View>
					</Experience>
					<Experience
						employer="UnifiedPost Group"
						duration="March 2019 - April 2021"
						position="Frontend Developer"
						src="pdf/assets/unifiedpost_logo.jpeg"
					>
						<Text>
							I worked at UP as a Frontend developer (solely React +
							Typescript), on a collaborative tool to make documents for print
							and invoicing (using Firebase for realtime collaboration). I
							specifically spent quite some time on back office tools enriching
							the product.
						</Text>
					</Experience>
					<Experience
						employer="De Cronos Groep"
						duration="August 2017 - March 2021"
						position="Frontend Developer"
						src="pdf/assets/cronos_logo.jpeg"
					>
						<View style={styles.vertical}>
							<Text>
								Following my graduation I worked as a Frontend Consultant for De
								Cronos Groep, where I contributed on React and React Native
								projects for Federal instances (National rail, Flemish tv
								broadcasting, BPost) and large corporations (Colruyt Group).
							</Text>
						</View>
					</Experience>
					<Experience
						employer="wearefront"
						duration="January 2016 - August 2017"
						position="Founder"
						src="pdf/assets/wearefront.jpeg"
					>
						<View style={styles.vertical}>
							<Text>
								wearefront was a project I started while in College, that flowed
								out of being actively involved in the Belgian metal scene,
								contributing in production but also management and distribution.
							</Text>
							<Text>
								This led me through the incubator programs of my College and KBC
								to focus on building tools for independent artists. This lasted
								until my graduation in 2017.
							</Text>
						</View>
					</Experience>
				</View>
			</Page>
		</Document>
	);
}

type ExperienceProps = {
	employer: string;
	position: string;
	duration: string;
	src: string;
	children: React.ReactNode;
};
function Experience(props: ExperienceProps) {
	return (
		<View style={[styles.topMargin, styles.horizontal]}>
			<Image style={styles.smallImage} src={props.src} />
			<View style={[styles.vertical, styles.grow]}>
				<View style={[styles.horizontal]}>
					<Text>
						<Text style={styles.bold}>{props.employer}</Text> ({props.position})
					</Text>
					<Text>|</Text>
					<Text>{props.duration}</Text>
				</View>
				<View style={{ maxWidth: "90%" }}>{props.children}</View>
			</View>
		</View>
	);
}
