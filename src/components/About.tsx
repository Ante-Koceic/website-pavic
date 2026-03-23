import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { generalInformation } from "@/data/generalInformation";
import { pillList } from "@/data/pillList";

export function About() {
  const t = useTranslations();

  return (
    <section id="about" className="scroll-mt-20 bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
          {t("aboutMe.eyebrow")}
        </span>
        <h2 className="mb-12 max-w-md font-serif text-3xl leading-[1.12] tracking-tight text-ink-900 md:text-4xl">
          {t("aboutMe.title")}
        </h2>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="flex items-start justify-center order-2 lg:justify-start lg:order-1">
            <div className="relative aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl shadow-sm">
              <Image
                src="/ivan-pavic-photo.jpg"
                alt="Portrait photo"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-6 right-6">
                <div className="rounded-2xl border border-white/80 bg-white/60 px-4 py-3 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-ink-900">
                    {t("aboutMe.cardName")}
                  </p>
                  <p className="text-xs text-ink-700">
                    {t("aboutMe.cardRole")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col gap-7 origin-top lg:order-2">
            <p className="max-w-lg text-base leading-relaxed text-ink-600">
              {t("aboutMe.lead")}
            </p>

            <ul className="flex flex-col gap-3">
              {generalInformation.map((information, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                    <information.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <span className="flex text-sm leading-relaxed text-start text-ink-900">
                    {t(information.text)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                {t("aboutMe.focusLabel")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {t("aboutMe.focus")}
              </p>
            </div>

            <div className="flex justify-baseline gap-4 flex-wrap">
              {pillList.map((pill, index) => (
                <Badge
                  variant="outline"
                  key={index}
                  className="bg-white py-2 px-3 shadow-sm flex flex-row gap-3"
                >
                  <div className="flex items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-200 p-1">
                    <pill.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">
                    {t(pill.text)}
                  </h3>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
