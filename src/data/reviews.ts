import { CustomerReview, LiveActivation } from '../types';

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    location: 'Austin, Texas',
    productName: 'Cursor AI Pro & Claude 3.5 Sonnet',
    rating: 5,
    comment: 'Was paying full $40/mo directly for both tools. Switched to Ryvora and credentials hit my email in literally 90 seconds. Both private accounts work flawlessly with our US dev stack. Best service I’ve used in 2026.',
    date: 'Yesterday',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    location: 'San Francisco, California',
    productName: 'Adobe Creative Cloud All Apps',
    rating: 5,
    comment: 'Saved our boutique design agency over $1,400 this year alone on 4 designer seats. All desktop apps (Photoshop, Illustrator, Premiere) activated without issues, Firefly AI credits work as advertised.',
    date: '2 days ago',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Derek Hoffman',
    location: 'Miami, Florida',
    productName: 'ChatGPT Plus & Midjourney v6.1',
    rating: 5,
    comment: 'Legit 100%. Had a quick question regarding workspace invite setup, clicked their live concierge chat and got a response in 2 minutes. The warranty replacement policy gave me complete peace of mind.',
    date: '3 days ago',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Sarah Jenkins',
    location: 'Seattle, Washington',
    productName: 'Canva Pro Enterprise',
    rating: 5,
    comment: 'They upgraded my existing personal Canva account within 3 minutes of checkout. All my brand kits, saved templates, and project folders stayed completely intact. Couldn’t be happier!',
    date: '4 days ago',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Tyler Brooks',
    location: 'New York, NY',
    productName: 'ElevenLabs Voice Pro',
    rating: 5,
    comment: 'The 100k voice credits showed up immediately. Voice cloning quality is identical to official retail at less than half the monthly cost. Will be renewing annually.',
    date: '5 days ago',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Chloe Patel',
    location: 'Chicago, Illinois',
    productName: 'Perplexity Pro',
    rating: 5,
    comment: 'Super fast checkout with Apple Pay. Received credentials and instructions immediately. Perplexity Pro with Claude 3.5 Sonnet is a daily lifesaver for research.',
    date: '1 week ago',
    verified: true
  }
];

export const LIVE_ACTIVATIONS: LiveActivation[] = [
  {
    id: 'act-1',
    productName: 'ChatGPT Plus & Team (1-Year)',
    category: 'AI Tools',
    customerMasked: 'd****@gmail.com',
    city: 'Austin',
    state: 'TX',
    minutesAgo: 2,
    planDuration: '1 Year License'
  },
  {
    id: 'act-2',
    productName: 'Adobe Creative Cloud All Apps',
    category: 'Design',
    customerMasked: 'alex.m****@outlook.com',
    city: 'San Francisco',
    state: 'CA',
    minutesAgo: 6,
    planDuration: '1 Month Private'
  },
  {
    id: 'act-3',
    productName: 'Cursor AI Pro Developer',
    category: 'Development',
    customerMasked: 'kevin.t****@hey.com',
    city: 'Seattle',
    state: 'WA',
    minutesAgo: 11,
    planDuration: '3 Months License'
  },
  {
    id: 'act-4',
    productName: 'Canva Pro (Personal Email Upgrade)',
    category: 'Design',
    customerMasked: 'sarah.j****@icloud.com',
    city: 'Denver',
    state: 'CO',
    minutesAgo: 18,
    planDuration: '1 Year Full Access'
  },
  {
    id: 'act-5',
    productName: 'ElevenLabs Voice Pro',
    category: 'AI Tools',
    customerMasked: 'producer_m****@gmail.com',
    city: 'Los Angeles',
    state: 'CA',
    minutesAgo: 24,
    planDuration: '1 Month Pro'
  },
  {
    id: 'act-6',
    productName: 'Netflix 4K Ultra HD Premium',
    category: 'Streaming',
    customerMasked: 'j.rodriguez****@yahoo.com',
    city: 'Miami',
    state: 'FL',
    minutesAgo: 31,
    planDuration: 'Dedicated Private Profile'
  },
  {
    id: 'act-7',
    productName: 'Claude Pro (Anthropic 3.5 Sonnet)',
    category: 'AI Tools',
    customerMasked: 'b.harrison****@gmail.com',
    city: 'Boston',
    state: 'MA',
    minutesAgo: 39,
    planDuration: '1 Month Access'
  },
  {
    id: 'act-8',
    productName: 'TradingView Premium',
    category: 'Finance',
    customerMasked: 'crypto.hawk****@gmail.com',
    city: 'Chicago',
    state: 'IL',
    minutesAgo: 45,
    planDuration: '1 Year Key'
  }
];
