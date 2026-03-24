const testimonials = [
  {
    quote:
      "OpenCosmo gave us the control layer we desperately needed. Our AI agents now operate safely at scale with full oversight.",
    author: "Sarah Johnson",
    role: "VP of AI Operations",
    company: "Enterprise Tech Corp",
  },
  {
    quote:
      "Finally, infrastructure that matches the sophistication of our AI agents. The guardrails and observability are game-changing.",
    author: "Michael Chen",
    role: "CTO",
    company: "AI-Native Startup",
  },
  {
    quote:
      "We went from hoping our agents wouldn't break things to having complete confidence and control. OpenCosmo is essential.",
    author: "Emily Rodriguez",
    role: "Head of Engineering",
    company: "FinTech Solutions",
  },
];

function renderBrandText(text) {
  const brand = "OpenCosmo";
  const index = text.indexOf(brand);

  if (index === -1) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <span className="text-[var(--brand-red)]">⭕</span> OpenCosmo
      {text.slice(index + brand.length)}
    </>
  );
}

export function Testimonials() {
  return (
    <section id="resources" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trusted by teams deploying AI in production
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Organizations choosing control over chaos.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-5xl text-[var(--brand-red)] mb-4">&quot;</div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">{renderBrandText(testimonial.quote)}</p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-gray-600 text-sm">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
