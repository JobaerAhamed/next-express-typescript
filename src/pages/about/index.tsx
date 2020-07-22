import {useRouter} from 'next/router'

export default function AboutPage() {
return <div>Hello From About Page { useRouter().query.name|| 'N/A' }</div>;
}