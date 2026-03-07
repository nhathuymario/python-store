import { Search, ShoppingBag, User, Menu, Flame } from "lucide-react";

export default function Header() {
  return (
    <>
      <div className="bg-black text-white text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <Flame className="h-4 w-4" />
            <span>MIỄN PHÍ SHIP ĐƠN TỪ 499K</span>
          </div>
          <div className="hidden gap-5 text-zinc-300 md:flex">
            <span>Hotline: 1900 0000</span>
            <span>Cửa hàng</span>
            <span>Chính sách đổi trả</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <button className="rounded-xl border border-zinc-200 p-2 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <div className="shrink-0 text-2xl font-black tracking-[0.25em] text-black">
            YAME
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            <a
              className="text-sm font-semibold uppercase tracking-wide hover:text-red-600"
              href="#"
            >
              Mới mở bán
            </a>
            <a
              className="text-sm font-semibold uppercase tracking-wide hover:text-red-600"
              href="#"
            >
              Sale
            </a>
            <a
              className="text-sm font-semibold uppercase tracking-wide hover:text-red-600"
              href="#"
            >
              Công nghệ thời trang
            </a>
            <a
              className="text-sm font-semibold uppercase tracking-wide hover:text-red-600"
              href="#"
            >
              Blog
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 md:flex">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                className="w-56 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                placeholder="Tìm áo thun, quần jeans..."
              />
            </div>

            <button className="rounded-full border border-zinc-200 p-2 hover:bg-zinc-50">
              <User className="h-5 w-5" />
            </button>

            <button className="relative rounded-full border border-zinc-200 p-2 hover:bg-zinc-50">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                2
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
