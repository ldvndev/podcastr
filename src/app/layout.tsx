import '../styles/global.scss'

import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from '../styles/app.module.scss'

export const metadata: Metadata = {
  title: "Podcastr",
  description: "Podcast application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
          <div className={styles.wrapper}>
            <main>
              <Header />
              {children}  
            </main>
            <Player />
          </div>
        </body>
      </html>
  );
}