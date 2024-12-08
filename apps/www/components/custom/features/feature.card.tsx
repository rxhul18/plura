import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "../text-wrappers";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  imgClassName?: string;
}

const FeatureCard: React.FC<CardProps & { rowSpan?: boolean }> = ({
  className,
  ...props
}) => {
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger className={className} {...props}>
        <Card
          className={
            "bg-card rounded-3xl p-4 hover:bg-muted/50 transition-all ease-in-out duration-300 w-full group flex flex-col justify-between gap-3 cursor-pointer"
          }
        >
          <DialogImage
            src="/images/usagehome.jpg"
            alt="image"
            className={"w-full rounded-xl object-cover max-h-60"}
          />
          <div className="flex justify-between flex-wrap items-center gap-3">
            <div>
              <DialogTitle>
                <SectionHeaderDescription className="">
                  Features
                </SectionHeaderDescription>
              </DialogTitle>

              <DialogSubtitle>
                <SectionHeaderHeading className="text-3xl md:text-4xl break-all">
                  Lorem ipsum dolor sit amet.
                </SectionHeaderHeading>
              </DialogSubtitle>
            </div>

            <Link
              href={""}
              className="border rounded-full p-3 group-hover:bg-neutral-600 transition-all ease-in-out duration-300"
            >
              <ChevronRight size={16} />
            </Link>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContainer>
        <DialogContent className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px] rounded-2xl">
          <ScrollArea className="h-[600px]">
            <DialogImage
              src="/images/usagehome.jpg"
              alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
              className="h-full w-full"
            />
            <div className="p-6">
              <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
                EB27
              </DialogTitle>
              <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
                Edouard Wilfrid Buquet
              </DialogSubtitle>
              <DialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
                className=""
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  labore dolorem a quae eum, minima eligendi natus deserunt
                  repellat? Labore ex quia illum voluptatibus exercitationem
                  sunt doloribus, fuga soluta hic qui eos, tempore asperiores
                  placeat ab corrupti eum rerum recusandae molestiae et
                  molestias nam magnam! Exercitationem facere neque dolores est!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis eveniet necessitatibus beatae, odio eligendi
                  dignissimos repellat sapiente ipsa illum quidem pariatur,
                  dolore sed nobis obcaecati. Accusantium molestias corporis
                  assumenda ullam voluptatibus praesentium, ab dolorem quam hic
                  eius doloribus libero aperiam repellendus, dolore asperiores
                  culpa ex similique tenetur error? Maiores quasi iste
                  recusandae! Alias similique sunt deleniti, quaerat obcaecati
                  itaque ex iste qui provident molestias natus inventore
                  explicabo tempore. Dolores aut obcaecati consectetur repellat
                  quaerat neque officiis autem voluptatem illum recusandae
                  adipisci in, beatae unde eum dignissimos? Facilis at eaque
                  quam nobis qui rerum libero cum tenetur. Officiis temporibus
                  blanditiis ullam?
                </p>
              </DialogDescription>
            </div>
          </ScrollArea>

          <DialogClose className="text-zinc-50" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
export default FeatureCard;
