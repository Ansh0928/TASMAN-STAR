import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <div className="relative mx-auto max-w-3xl py-6">
      <InfiniteSlider gap={42} reverse speed={60} speedOnHover={20}>
        {logos.map((logo) => (
          <div key={`logo-${logo.alt}`} className="flex flex-col items-center gap-2">
            <img
              alt={logo.alt}
              className="pointer-events-none h-10 select-none md:h-12 object-contain"
              height="auto"
              loading="lazy"
              src={logo.src}
              width="auto"
            />
            <span className="text-theme-muted text-xs font-medium whitespace-nowrap">{logo.alt}</span>
          </div>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 left-0 h-full w-[100px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={1}
        className="pointer-events-none absolute top-0 right-0 h-full w-[100px]"
        direction="right"
      />
    </div>
  );
}
