export type MenuItem = {
  label: string;
  description?: string;
  action: () => void;
};

export type MenuGroup = {
  id: string;
  label: string;
  items: MenuItem[];
};

type TranslateFn = (key: string) => string;

type MenuActions = {
  toPhilosophy: () => void;
  toInvest: () => void;
  toNeighborhood: () => void;
  toInsights: () => void;
  openAgentPortal: () => void;
  openPartnerModal: () => void;
};

export function buildMenuGroups(t: TranslateFn, actions: MenuActions): MenuGroup[] {
  return [
    {
      id: 'invest',
      label: t('menuOverlay.groups.invest'),
      items: [
        { label: t('philosophy.sectionTitle'), action: actions.toPhilosophy },
        { label: t('investment.eyebrow'), action: actions.toInvest },
        { label: t('neighborhood.eyebrow'), action: actions.toNeighborhood },
        { label: t('nav.insights'), action: actions.toInsights },
      ],
    },
    {
      id: 'private',
      label: t('menuOverlay.privateArea'),
      items: [
        {
          label: t('menuOverlay.agentPortalTitle'),
          description: t('menuOverlay.agentPortalDescription'),
          action: actions.openAgentPortal,
        },
        {
          label: t('menuOverlay.partnerPortalTitle'),
          description: t('menuOverlay.partnerPortalDescription'),
          action: actions.openPartnerModal,
        },
        {
          label: t('menuOverlay.dataLabPortalTitle'),
          description: t('menuOverlay.dataLabPortalDescription'),
          action: actions.openPartnerModal,
        },
      ],
    },
  ];
}
