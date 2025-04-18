import Link from "next/link";

function Navbar() {
    return <div className="w-full h-12 bg-slate-200 flex items-center px-4 justify-center">
        <div className="w-3/4 flex justify-between items-center">
            <h1 className="font-bold">Organizer</h1>
        <div className="flex gap-4">
            <Link href={'/login'}>Log in</Link>
            <Link href={'/signup'}>Sign up</Link>
        </div>
        </div>
    </div>
}

export default Navbar;