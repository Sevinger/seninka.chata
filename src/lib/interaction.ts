export type CarouselDirection = "previous" | "next";

export function heroShouldAutoplay(reducedMotion: boolean) {
  return !reducedMotion;
}

export function carouselStep(
  dimensions: { cardWidth: number; gap: number },
  direction: CarouselDirection,
) {
  const distance = dimensions.cardWidth + dimensions.gap;
  if (distance === 0) return 0;
  return direction === "next" ? distance : -distance;
}
