import type { AppLanguage } from '../../utils/settings'

export type CommunityCopy = {
  modalTitle: string
  modalHint: string
  closeModal: string
  credit: string
  facebook: { bottom: string; logo: string; aria: string }
  discord: { bottom: string; logo: string; aria: string }
  feedback: { bottom: string; logo: string; suffix: string; aria: string }
}

const EN: CommunityCopy = {
  modalTitle: 'Where do you want to connect?',
  modalHint: 'Hover a card for the animation. Click to open the link.',
  closeModal: 'Close dialog',
  credit: 'Card animation (Uiverse-style) · Inspired by Smit-Prajapati on',
  facebook: {
    bottom: 'official group',
    logo: 'facebook',
    aria: 'Open the Facebook group in a new tab',
  },
  discord: {
    bottom: 'discord live chat',
    logo: 'discord',
    aria: 'Open the Discord server in a new tab',
  },
  feedback: {
    bottom: 'bugs & ideas',
    logo: 'feedback',
    suffix: 'eedback',
    aria: 'Send feedback on GitHub (new tab)',
  },
}

const TL: CommunityCopy = {
  modalTitle: 'Saan mo gustong kumonekta?',
  modalHint: 'I-hover ang card para sa animation. I-click para pumunta sa link.',
  closeModal: 'Isara ang dialogo',
  credit: 'Card animation (Uiverse-style) · Inspired by Smit-Prajapati on',
  facebook: {
    bottom: 'opisyal na grupo',
    logo: 'facebook',
    aria: 'Buksan ang Facebook group sa bagong tab',
  },
  discord: {
    bottom: 'live chat sa discord',
    logo: 'discord',
    aria: 'Buksan ang Discord server sa bagong tab',
  },
  feedback: {
    bottom: 'bugs at ideya',
    logo: 'feedback',
    suffix: 'eedback',
    aria: 'Magpadala ng feedback sa GitHub (bagong tab)',
  },
}

export function getCommunityCopy(lang: AppLanguage): CommunityCopy {
  return lang === 'en' ? EN : TL
}
