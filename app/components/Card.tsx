import Image from "next/image";
import Link from "next/link";

export default function Card(props: any) {
  return (
    <div className={props.className}>
      <Link href={`/${props.countryName}`}>
        <Image src={props.countryFlag} alt="" width="0" height="0" className="w-full rounded-t-md aspect-[3/2] object-cover" />
        <div className="p-8 bg-primary dark:bg-secondary rounded-b-md text-secondary-900 dark:text-primary">
          <h2 className="font-bold text-lg mb-4">{props.countryName}</h2>
          {Object.keys(props.content).map((key, idx) => {
            if (props.content[key] !== undefined) {
              return <p key={idx} className="text-sm"><em className="not-italic font-semibold">{key[0].toUpperCase() + key.slice(1)}:</em> {Number.isInteger(props.content[key]) ? new Intl.NumberFormat('en-US').format(props.content[key]) : props.content[key]}</p>
            }
          })}
        </div>

      </Link>
    </div>
  )
}