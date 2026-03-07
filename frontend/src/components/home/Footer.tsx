export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-xl font-black tracking-[0.25em]">YAME</div>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Layout homepage thời trang nam với nhiều tầng điều hướng, sản phẩm
            nổi bật và section công nghệ chất liệu.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">
            Danh mục
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>Áo</li>
            <li>Quần</li>
            <li>Phụ kiện</li>
            <li>Sale</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Hỗ trợ</h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>Chính sách vận chuyển</li>
            <li>Đổi trả</li>
            <li>Bảo hành</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">
            Theo dõi
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
