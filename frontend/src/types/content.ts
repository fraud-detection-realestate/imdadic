export interface NavigationLink {
  href: string;
  label: string;
}

export interface FeatureCard {
  id: string;
  icon: string;
  bgColor: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface CTAButton {
  label: string;
  href: string;
}

export interface Dataset {
  name: string;
  source: string;
  url: string;
}

export interface ContentSection {
  title: string;
  icon: string;
}