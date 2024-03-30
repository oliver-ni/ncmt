/*
 * Copyright (c) 2024 Oliver Ni
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { PropsWithChildren } from "react";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import clsx from "clsx";
import nProgress from "nprogress";
import { useEffect } from "react";

import nProgressStyles from "~/nprogress.css";
import styles from "~/tailwind.css";

import { Alert, AlertStatus, Button } from "./components/ui";

export const meta: MetaFunction = () => [
  { name: "charset", content: "utf-8" },
  { name: "title", content: "ContestDojo" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { name: "msapplication-TileColor", content: "#f40808" },
  { name: "theme-color", content: "#ffffff" },
];

export const links: LinksFunction = () => [
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#f40808" },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: nProgressStyles },
];

type WrapperProps = PropsWithChildren<{
  className?: string;
}>;

function Wrapper({ className, children }: WrapperProps) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className={clsx`h-full ${className}`}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Error";
  let description = "An unknown error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description = error.data;
  } else if (error instanceof Error) {
    title = error.name;
    description = error.message;
  }

  return (
    <Wrapper className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
      <Alert status={AlertStatus.Error} title={title}>
        {description}
      </Alert>
      <div className="flex justify-center gap-4">
        <Button onClick={() => window.location.reload()}>Reload</Button>
        <Button as={Link} to="/">
          Go Home
        </Button>
      </div>
    </Wrapper>
  );
}

export default function App() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading" || navigation.state === "submitting") {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [navigation.state]);

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
