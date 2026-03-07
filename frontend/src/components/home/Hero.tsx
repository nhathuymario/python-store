type HeroCard = {
  title: string;
  subtitle: string;
};

type Props = {
  heroCards: HeroCard[];
};

export default function Hero({ heroCards }: Props) {
  return (
    <section className="border-b border-zinc-100 bg-[linear-gradient(135deg,#0a0a0a_0%,#222_52%,#7f1d1d_100%)] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:p-10">
          <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">
            Bộ sưu tập nổi bật
          </div>

          <h1 className="max-w-3xl text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">
            Trang phục nam bền, mềm, không lỗi mốt
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
            Giao diện homepage phong cách thời trang nam, nhấn mạnh danh mục, bộ
            sưu tập và trải nghiệm mua sắm hiện đại.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]">
              Mua ngay
            </button>
            <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">
              Xem bộ sưu tập
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {heroCards.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
                Feature
              </p>
              <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
