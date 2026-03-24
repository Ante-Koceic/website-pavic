import { FileText, Gavel, House, Landmark, Users, Wrench } from "lucide-react";

export const services = [
  {
    id: "property",
    icon: House,
    titleKey: "services.property.title",
    descKey: "services.property.desc",
  },
  {
    id: "contract",
    icon: FileText,
    titleKey: "services.contract.title",
    descKey: "services.contract.desc",
  },
  {
    id: "inheritance",
    icon: Users,
    titleKey: "services.inheritance.title",
    descKey: "services.inheritance.desc",
  },
  {
    id: "admin",
    icon: Landmark,
    titleKey: "services.admin.title",
    descKey: "services.admin.desc",
  },
  {
    id: "enforcement",
    icon: Gavel,
    titleKey: "services.enforcement.title",
    descKey: "services.enforcement.desc",
  },
  {
    id: "labor",
    icon: Wrench,
    titleKey: "services.labor.title",
    descKey: "services.labor.desc",
  },
  {
    id: "migration",
    icon: Wrench,
    titleKey: "services.migration.title",
    descKey: "services.migration.desc",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
