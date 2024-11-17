import Image from "next/image";
import {ModeToggle} from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className={"flex-auto flex flex-col justify-center items-center"}>
      <ModeToggle />
    </div>
  );
}
