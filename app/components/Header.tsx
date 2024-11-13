import Image from 'next/image';
import LogoWhite from '@/public/logo-white.svg';
import SettingsWhite from '@/public/settings-white.svg';

export default function Header() {
  return (
    <nav className="container max-w-2xl mx-auto mb-8 px-2 sm:px-0">
      <div className="flex  justify-between py-2 border-b-gray-600 border-b-2 border-opacity-15">
        <div className="logo flex gap-1 items-center text-lg font-semibold">
          <Image src={LogoWhite} height={28} alt="Logo" />
          Peakfocus
        </div>
        <div>
          <button className="rounded-md bg-white bg-opacity-10 border border-transparent flex gap-1 items-center py-2 px-4 text-center text-xs text-white transition-all shadow-sm hover:shadow-lg active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <Image src={SettingsWhite} alt="setting" height={20} />
            <span className="hidden sm:block">Setting</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
