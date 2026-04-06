import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'weather',
    name: '날씨/계절',
    emoji: '🌤️',
    description: '가장 무난하고 누구와도 할 수 있는 대화',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'food',
    name: '음식/맛집',
    emoji: '🍽️',
    description: '모두가 좋아하는 먹거리 이야기',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'travel',
    name: '여행',
    emoji: '✈️',
    description: '가봤던 곳, 가고 싶은 곳 이야기',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'entertainment',
    name: '영화/드라마',
    emoji: '🎬',
    description: '요즘 볼만한 콘텐츠 이야기',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'sports',
    name: '스포츠',
    emoji: '⚽',
    description: '경기 결과, 선수, 운동 이야기',
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'work',
    name: '직장생활',
    emoji: '💼',
    description: '회사, 업무, 커리어 관련 대화',
    color: 'bg-slate-100 text-slate-700',
  },
  {
    id: 'hobby',
    name: '취미/관심사',
    emoji: '🎨',
    description: '다양한 취미와 관심사 나누기',
    color: 'bg-pink-100 text-pink-700',
  },
  {
    id: 'trend',
    name: '트렌드/시사',
    emoji: '📱',
    description: '요즘 핫한 이슈와 트렌드',
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'daily',
    name: '일상/라이프',
    emoji: '☕',
    description: '소소한 일상 이야기',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'humor',
    name: '유머/재미',
    emoji: '😄',
    description: '분위기를 밝게 만드는 재미있는 화제',
    color: 'bg-yellow-100 text-yellow-700',
  },
];
