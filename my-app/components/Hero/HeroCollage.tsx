import Image from "next/image";

type CollageImage = {
  src: string;
  alt: string;
};

const COLLAGE: {
  main: CollageImage;
  grid: [CollageImage, CollageImage, CollageImage, CollageImage];
} = {
  main: {
    src: "/luis/tio_cool_fake2.jpg",
    alt: "Luis Lara, El Tío Cool",
  },
  grid: [
    {
      src: "/libros/momentos_inesperados.png",
      alt: "Momentos Inesperados",
    },
    {
      src: "/libros/cambiando_vidas.png",
      alt: "Cambiando Vidas",
    },
    {
      src: "/libros/camino_al_chingonario.png",
      alt: "Camino al Chingonario",
    },
    {
      src: "/libros/dos_veces_viuda.png",
      alt: "Dos Veces Viuda",
    },
  ],
};

function CollageCell({
  image,
  className,
  priority = false,
}: {
  image: CollageImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-(--background) ${className ?? ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 40vw, 160px"
        className="object-cover"
      />
    </div>
  );
}

export default function HeroCollage() {
  return (
    <div className="relative z-10 w-full max-w-[min(100%,34rem)] shrink-0 md:max-w-[44rem]">
      <div className="grid aspect-[4/5.5] grid-cols-3 grid-rows-2 gap-0">
        <CollageCell
          image={COLLAGE.main}
          className="col-span-1 row-span-2"
          priority
        />
        {COLLAGE.grid.map((image, index) => (
          <CollageCell key={index} image={image} />
        ))}
      </div>
    </div>
  );
}
