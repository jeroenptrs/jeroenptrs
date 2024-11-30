import { Text as _Text, type TextProps, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import cn from "clsx";
import { vars } from "nativewind";
import { useTheme } from "@react-navigation/native";

const linkCn = "font-serif underline underline-offset-2 text-teal-250";
const Text = ({ className, ...props }: TextProps) => (
	<_Text
		{...props}
		className={cn(
			"text-[--text-color] text-base mt-2 font-sans font-light",
			className,
		)}
	/>
);

const avatar = require("@/assets/images/avatar.png");

export default function Index() {
	const { colors } = useTheme();
	return (
		<View
			className="container flex justify-center items-center w-full h-full"
			style={vars({
				"--avatar-width": `${avatar.width}px`,
				"--card-color": colors.card,
				"--text-color": colors.text,
			})}
		>
			<View className="outline-gray-150 dark:outline-slate-850 bg-[--card-color] dark:bg-[--card-color] rounded p-6 outline outline-1">
				<View className="max-w-[600px] flex-1">
					<View className="mb-4 flex-col gap-4 items-center">
						<Image
							className="rounded w-[150px] h-[150px]"
							source={avatar}
							alt="Photograph taken of me during a conference talk"
						/>
						<View className="items-center">
							<_Text className="text-[--text-color] font-serif text-[1.5rem] leading-8 flex-1 text-center">
								Jeroen Peeters
							</_Text>
							<_Text className="text-[--text-color] text-base opacity-70 dark:opacity-60">
								Frontend Developer
							</_Text>
							<View className="flex flex-row gap-2">
								<Text>
									<Link
										href="mailto:contact@jeroenpeeters.be"
										target="_blank"
										rel="noopener noreferrer"
									>
										📨
									</Link>{" "}
									|{" "}
									<Link
										href="https://bsky.app/profile/jeroenbpeeters.bsky.social"
										target="_blank"
									>
										🦋
									</Link>{" "}
									|{" "}
									<Link
										href="https://linkedin.com/in/jeroenptrs"
										target="_blank"
										className="text-white bg-blue-550 px-[3px] ml-0.5"
									>
										in
									</Link>
								</Text>
							</View>
						</View>
					</View>
					<_Text className="text-lg font-serif mt-4 font-normal text-[--text-color]">
						Hello there 👋
					</_Text>
					<Text>
						My name is Jeroen Peeters, I'm a Frontend Developer at{" "}
						<Link
							href="https://twipemobile.com"
							target="_blank"
							className={cn(linkCn)}
						>
							Twipe
						</Link>
						. My focus is on product development using React, React Native and
						Typescript.
					</Text>
					<View className="mt-4">
						<_Text className="text-lg text-[--text-color] font-serif font-normal mt-2 opacity-70 dark:opacity-60">
							Experience
						</_Text>
					</View>
					<Text>
						Clicking through to{" "}
						<Link href="/resume" className={cn(linkCn)}>
							/resume
						</Link>
						, you will find an interactive version of my résumé.{"\n"}A PDF
						version can be found at{" "}
						<Link
							href="/resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(linkCn)}
						>
							/resume.pdf
						</Link>
						.
					</Text>
				</View>
			</View>
		</View>
	);
}
