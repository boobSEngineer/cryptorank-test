import React from "react";
import {Header} from "@/components/header";
import {BaseWrapper} from "@/styles/components/wrappers";

type Props = {
  children: React.ReactNode,
  className?: string,
}

export function PrimaryLayout({children, className=''}: Props) {
  return (
    <BaseWrapper>
      <Header />
      <main>
        {children}
      </main>
    </BaseWrapper>
  );
}
