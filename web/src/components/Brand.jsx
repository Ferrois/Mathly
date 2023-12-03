import Image from "next/image";
import MathlySvg from "@/assets/Mathly.svg";

export default function Brand({ className }) {
  return (
    <div className={"flex items-center gap-2 " + className}>
      <Image src={MathlySvg} alt="Mathly Logo" width={35} height={35} />
      <span className="text-xl">Mathly</span>
    </div>
  );
}
