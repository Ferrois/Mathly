import Image from "next/image";
import MathlySvg from "@/assets/Mathly.svg";

export default function Brand({ className }) {
  return (
    <div className={"flex items-center gap-2 " + className}>
      <Image src={MathlySvg} alt="Mathly Logo" width={40} height={40} />
      <span className="text-2xl">Mathly</span>
    </div>
  );
}
