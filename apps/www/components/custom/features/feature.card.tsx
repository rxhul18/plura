import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "../text-wrappers";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FeatureCard: React.FC<CardProps & { rowSpan?: boolean }> = ({
  className,
  rowSpan = false,
  ...props
}) => {
  return (
    <Card
      className={cn(
        "bg-card rounded-3xl p-4 hover:bg-muted/50 transition-all ease-in-out duration-300 w-full group flex flex-col justify-between gap-3",
        className
      )}
      {...props}
    >
      <Image
        src="/images/usagehome.jpg"
        alt="image"
        height={300}
        width={500}
        draggable={false}
        className={cn(
          "w-full rounded-xl object-cover",
          rowSpan ? "h-full" : "h-60"
        )}
        quality={100}
        unoptimized={true}
      />
      <div className="flex justify-between flex-wrap items-center gap-3">
        <div>
          <SectionHeaderDescription className="">
            Features
          </SectionHeaderDescription>
          <SectionHeaderHeading className="text-3xl md:text-4xl break-all">
            Lorem ipsum dolor sit amet.
          </SectionHeaderHeading>
        </div>

        <Link
          href={""}
          className="border rounded-full p-3 group-hover:bg-neutral-600 transition-all ease-in-out duration-300"
        >
          <ChevronRight size={16} />
        </Link>
      </div>
    </Card>
  );
};
export default FeatureCard;
