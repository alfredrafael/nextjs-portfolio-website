import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Badge,
  Link,
} from "lucide-react";
import LinkedinLucide from "@/components/icons/linkedinLucide";
export const contactData = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (617) 580-1400",
    href: "tel:+16175801400",
    plusSignAndOnlyDashesValue: "+1-617-580-1400",
  },
  {
    icon: Mail,
    label: "Email",
    value: "AlfredRafael@gmail.com",
    href: "mailto:alfredrafael@gmail.com",
  },
  {
    icon: LinkedinLucide,
    label: "LinkedIn",
    value: "www.Linkedin/Alfredo-Rafael",
    href: "https://www.linkedin.com/in/alfredo-rafael/",
  },
  //   {
  //     icon: MapPin,
  //     label: "Office",
  //     value: "5767 75th Ave, Pinellas Park\n FL 33781",
  //     href: "https://www.google.com/maps/place/Pinellas+Park,+FL/@27.8597714,-82.7524459,13z/data=!3m1!4b1!4m6!3m5!1s0x88c2e4eeef314f25:0x3f127ac896cd422d!8m2!3d27.8428025!4d-82.6995443!16zL20vMHJyMzQ?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D",
  //   },
  //   {
  //     icon: Clock,
  //     label: "Hours",
  //     value: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
  //     href: null,
  //   },
];
