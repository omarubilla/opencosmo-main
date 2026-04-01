import Image from "next/image";

export default function LandingFooter() {
  return (
    <footer className="w-full bg-[#4a4540] text-[#f5f2ed] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-2">OpenCosmo</h3>
            <p className="text-xs font-light">Agent Execution Protocol</p>
            <Image
              src="/nvidia_inception_logo.png"
              alt="NVIDIA Inception"
              width={180}
              height={42}
              className="mb-2 h-auto w-[150px] object-contain"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="text-sm font-light space-y-1">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="text-sm font-light space-y-1">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="text-sm font-light space-y-1">
              <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#6b6158] pt-6 text-center text-sm font-light">
          <p>&copy; 2026 OpenCosmo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
