type Props = {
  technologies: string[];
};

export default function TechnologySection({ technologies }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-[32px] bg-zinc-950 px-6 py-8 text-white md:px-10 md:py-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Công nghệ thời trang
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-4xl">
              Chất liệu là điểm nhấn
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-zinc-300">
            Tập trung giới thiệu công nghệ vải, cảm giác mặc và lợi ích của từng
            dòng sản phẩm.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm font-semibold text-zinc-100"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
