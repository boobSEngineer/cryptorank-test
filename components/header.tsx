import Link from "next/link";
import {BaseHeader} from "@/styles/components/components";
import {useRouter} from "next/router";

export function Header() {
  const router = useRouter();

  return (
    <BaseHeader>
      <Link className={router.pathname == "/converter" ? "active" : ""} href={'/converter'}>converter</Link>
      <Link className={router.pathname == "/table" ? "active" : ""} href={'/table'}>table</Link>
    </BaseHeader>
  )
}
