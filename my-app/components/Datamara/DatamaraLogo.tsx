type DatamaraLogoProps = {
  className?: string;
};

export default function DatamaraLogo({ className = "" }: DatamaraLogoProps) {
  return (
    <img
      src="/datamara_seguros/datamara_seguros.png"
      alt="Datamara Seguros"
      width={1540}
      height={1514}
      className={`size-20 shrink-0 object-contain md:size-28 ${className}`}
    />
  );
}
