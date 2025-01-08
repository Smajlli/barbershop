import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <>
    <div>This is homepage</div>
    <Link href={'/signup'}>Sign up</Link>
  </>
}
