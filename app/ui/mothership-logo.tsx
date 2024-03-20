import { GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { dmMono } from '@/app/ui/fonts';

export default function MotherShipLogo() {
  return (
    <div
      className={`${dmMono.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAmericasIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[14px]">Mothership</p>
    </div>
  );
}
