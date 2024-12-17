"use client";

import Head from "expo-router/head";
import type { PropsWithChildren } from "react";

export function ArticleHead({ children }: PropsWithChildren<unknown>) {
	return <Head>{children}</Head>;
}
