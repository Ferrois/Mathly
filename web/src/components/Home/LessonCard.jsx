import MathlySvg from "@/assets/Mathly.svg";
import Image from "next/image";
import Link from "next/link";

export default function LessonCard(props) {
  return (
    <Link
      href={props.link}
      className="w-full border-gray-300 border-[1px] shadow-md aspect-square rounded-md hover:opacity-80 hover:cursor-pointer"
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          <Image src={MathlySvg} alt={props.name} width={100} height={100} />
        </div>
        <div>
          <pre className="p-2 font-bold w-auto break-words whitespace-pre-wrap">{props.name}</pre>
        </div>
      </div>
    </Link>
  );
}
