import { ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function FeatureBar() {
  const items = [
    {
      icon: Truck,
      title: "Miễn phí giao hàng",
      text: "Cho đơn từ mức giá tối thiểu",
    },
    {
      icon: ShieldCheck,
      title: "Đổi trả linh hoạt",
      text: "Hỗ trợ nhanh tại cửa hàng",
    },
    {
      icon: Sparkles,
      title: "Chất liệu công nghệ",
      text: "Mềm, mát, bền hơn mỗi ngày",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5"
          >
            <item.icon className="h-6 w-6" />
            <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
