// Who talks in the story. `voice` tunes the device voice per person (pitch, rate), so the chat doesn't sound like one
// speaker. `huh` are the in-character reactions to a wrong reply, when the script has no special one.

export const CAST = {
  stranger: { name: 'Stranger', bg: '--night', voice: { pitch: 1.35, rate: .92 },
    huh: [['Hm. Even my old radio never said it like that.', 'Hm. Nici radioul meu vechi n-a zis-o niciodată așa.'],
      ['Is that right? It sounds strange to me.', 'E corect? Mie îmi sună ciudat.'],
      ['I am not sure. Can you say it again?', 'Nu sunt sigur. Poți s-o spui din nou?']] },
  tom: { name: 'Tom', bg: '--cafe-wall', voice: { pitch: 1, rate: .98 },
    huh: [['Sorry, you lost me there.', 'Scuze, n-am prins ce-ai zis.'], ['Say that again?', 'Mai spune o dată?'], ['Come again?', 'Poftim?']] },
  priya: { name: 'Priya', bg: '--shop-wall', voice: { pitch: 1.12, rate: .98 },
    huh: [['Sorry, love? One more time.', 'Poftim, dragă? Încă o dată.'], ['Hm? Say that again?', 'Hm? Mai spune o dată?']] },
  sam: { name: 'Sam', bg: '--pen-soft', voice: { pitch: .86, rate: .94 },
    huh: [['Eh? Come again?', 'Ce? Mai zi o dată?'], ['Not sure I follow, mate.', 'Nu prea te-am înțeles, amice.']] },
  hughes: { name: 'Mrs Hughes', bg: '--postbox-soft', voice: { pitch: 1.22, rate: 1.04 },
    huh: [['Pardon, dear?', 'Poftim, dragă?'], ['Oh dear. Say that again, love.', 'Vai. Mai spune o dată, dragă.']] },
  okafor: { name: 'Dr Okafor', bg: '--leaf-soft', voice: { pitch: 1.04, rate: .96 },
    huh: [['Not quite. Check that again.', 'Nu chiar. Mai verifică o dată.'], ['Hm. Try that again.', 'Hm. Mai încearcă.']] },
  moss: { name: 'Mr Moss', bg: '--moss', voice: { pitch: .7, rate: .86 },
    huh: [['Hm. Say it again, slowly.', 'Hm. Mai spune o dată, rar.']] },
  voice: { name: 'Vocea', bg: '--b-navy', voice: { pitch: .62, rate: .84 }, huh: [] },
  // the voice on the radio in the first episodes: the same name, another voice (whose, the story tells later)
  oldvoice: { name: 'Vocea', bg: '--b-navy', voice: { pitch: .7, rate: .86 }, huh: [] },
  mimi: { name: 'Mimi', bg: '--b-blue', voice: { pitch: 1.6, rate: 1 }, huh: [['Mrrp?', '(Mimi te privește nedumerită.)']] },
};

/** The name to show for `who`, in episode `ep` (the Stranger has a name from episode 7 on). */
export const nameOf = (who, ep = 1) => who === 'stranger' && ep >= 8 ? 'Aster' : CAST[who]?.name || who;
