import Link from "next/link";

function NextButton(props: {route: string}) {
    const {route} = props;

    return <Link href={route}>Next</Link>
}

export default NextButton;