export type EmotionType =
  | 'Happy'
  | 'Sad'
  | 'Romantic'
  | 'Heartbreak'
  | 'Motivational'
  | 'Chill'
  | 'Party'
  | 'Dark'
  | 'Spiritual';


export const emotionAudios: Record<EmotionType, string[]> = {
  Happy: [
    '/audio-data/happy1.mp3',
    '/audio-data/happy2.mp3',
    '/audio-data/happy3.mp3'
  ],
  Sad: [
    '/audio-data/sad1.mp3',
    '/audio-data/sad2.mp3'
  ],
  Romantic: [
    '/audio-data/love1.mp3',
    '/audio-data/love2.mp3',
    '/audio-data/romantic_1.mp3',
    '/audio-data/romantic_2.mp3',
    '/audio-data/romntic_3.mp3'
  ],
  Heartbreak : [
    '/audio-data/heartbreak.mp3',
  ],
  Motivational: [
    '/audio-data/motivation_1.mp3'
  ],
  Chill: [
    '/audio-data/chill.mp3'
  ],
  Party: [
    '/audio-data/party_1.mp3'
  ],
  Dark: [
    '/audio-data/dark_1.mp3'
  ],
  Spiritual: [
    '/audio-data/spiritual.mp3'
  ]
};
