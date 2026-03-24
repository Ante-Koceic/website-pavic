import en from "../../messages/en.json";
import hr from "../../messages/hr.json";
import localServiceSlugs from "@/data/local-service-slugs.json";
import { services, type ServiceId } from "@/data/services";
import { slugify } from "@/lib/slugify";

const messagesByLocale = { hr, en } as const;

type Messages = typeof hr;
type Locale = keyof typeof messagesByLocale;

type LocalSlugGroup = {
  serviceId: ServiceId | null;
  keyword: string;
  cities: string[];
  seoTitleTemplate?: string;
  seoDescriptionTemplate?: string;
};

type LocalSlugConfig = Record<string, LocalSlugGroup[]>;

type ServiceSlugEntry = {
  slug: string;
  serviceId: ServiceId | null;
  source: "service" | "local";
  city?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const localSlugConfig = localServiceSlugs as LocalSlugConfig;

function getMessages(locale: string): Messages {
  if (locale in messagesByLocale) {
    return messagesByLocale[locale as Locale];
  }

  return messagesByLocale.hr;
}

export function slugForService(messages: Messages, serviceId: ServiceId): string {
  const title = messages?.services?.[serviceId]?.title;

  if (typeof title !== "string" || !title.trim()) {
    return slugify(serviceId);
  }

  return slugify(title);
}

function applyTemplate(template: string, city: string): string {
  return template.replace(/\{city\}/g, city);
}

function getLocalSlugEntries(locale: string): ServiceSlugEntry[] {
  const groups = localSlugConfig[locale] ?? [];

  return groups.flatMap((group) => {
    const keyword = typeof group.keyword === "string" ? group.keyword.trim() : "";
    if (!keyword) {
      return [];
    }

    const cities = Array.isArray(group.cities) ? group.cities : [];
    const titleTemplate =
      typeof group.seoTitleTemplate === "string"
        ? group.seoTitleTemplate.trim()
        : "";
    const descriptionTemplate =
      typeof group.seoDescriptionTemplate === "string"
        ? group.seoDescriptionTemplate.trim()
        : "";

    return cities
      .map((city) => {
        const cityValue = city.trim();
        return {
          slug: slugify(`${keyword} ${cityValue}`),
          serviceId: group.serviceId ?? null,
          source: "local",
          city: cityValue,
          seoTitle: titleTemplate
            ? applyTemplate(titleTemplate, cityValue)
            : undefined,
          seoDescription: descriptionTemplate
            ? applyTemplate(descriptionTemplate, cityValue)
            : undefined,
        };
      });
  });
}

export function getServiceSlugEntries(locale: string): ServiceSlugEntry[] {
  const messages = getMessages(locale);
  const baseEntries: ServiceSlugEntry[] = services.map((service) => ({
    slug: slugForService(messages, service.id),
    serviceId: service.id,
    source: "service",
  }));
  const combined = [...baseEntries, ...getLocalSlugEntries(locale)];
  const seen = new Set<string>();

  return combined.filter((entry) => {
    if (!entry.slug || seen.has(entry.slug)) {
      return false;
    }

    seen.add(entry.slug);
    return true;
  });
}

export function getServiceSlugs(locale: string): string[] {
  return getServiceSlugEntries(locale).map((entry) => entry.slug);
}

export function getServiceIdBySlug(
  locale: string,
  serviceSlug: string,
): ServiceId | null {
  const entry = getServiceSlugEntry(locale, serviceSlug);

  return entry?.serviceId ?? null;
}

export function getServiceSlugEntry(
  locale: string,
  serviceSlug: string,
): ServiceSlugEntry | null {
  return (
    getServiceSlugEntries(locale).find((item) => item.slug === serviceSlug) ??
    null
  );
}

export function getServiceMessages(locale: string): Messages {
  return getMessages(locale);
}
