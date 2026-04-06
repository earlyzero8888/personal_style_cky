import type { NewsCategoryId } from '../types';

interface TalkTemplate {
  starters: string[];
  followUps: string[];
  tips: string[];
}

export const talkTemplates: Record<NewsCategoryId, TalkTemplate> = {
  general: {
    starters: [
      '요즘 {topic} 소식 보셨어요?',
      '{topic} 이야기 들으셨어요?',
      '오늘 뉴스에서 {topic} 봤는데, 어떻게 생각하세요?',
    ],
    followUps: [
      '저는 좀 놀랐는데, 어떠세요?',
      '주변에서도 이 얘기 많이 하던데요.',
      '이거 앞으로 어떻게 될 것 같아요?',
    ],
    tips: [
      '너무 강한 의견보다는 상대 생각을 먼저 물어보세요.',
      '정치적으로 예민한 뉴스는 가볍게만 언급하세요.',
    ],
  },
  entertainment: {
    starters: [
      '{topic} 보셨어요? 요즘 완전 핫하더라고요.',
      '요즘 {topic} 때문에 SNS가 난리던데요.',
      '{topic} 소식 아세요? 재밌는 이야기예요.',
    ],
    followUps: [
      '혹시 관련 콘텐츠 보신 거 있어요?',
      '이런 거 좋아하세요?',
      '요즘 볼만한 거 추천해주세요!',
    ],
    tips: [
      '연예 소식은 가십보다는 작품/콘텐츠 중심으로 이야기하세요.',
      '상대가 관심 없어 보이면 자연스럽게 주제를 전환하세요.',
    ],
  },
  sports: {
    starters: [
      '{topic} 보셨어요? 어제 경기 대박이었는데!',
      '요즘 {topic} 때문에 스포츠 팬들이 들끓고 있어요.',
      '{topic} 소식 들으셨어요?',
    ],
    followUps: [
      '혹시 어디 팬이세요?',
      '운동 좋아하세요?',
      '직접 해보신 적 있어요?',
    ],
    tips: [
      '상대 팀을 비하하지 마세요.',
      '스포츠를 잘 몰라도 "저도 좀 알려주세요"로 대화를 이어갈 수 있어요.',
    ],
  },
  tech: {
    starters: [
      '{topic} 소식 보셨어요? 신기하더라고요.',
      '요즘 {topic} 때문에 말이 많던데, 어떻게 생각하세요?',
      '{topic} 써보셨어요? 요즘 핫하던데.',
    ],
    followUps: [
      '이런 거 관심 있으세요?',
      '직접 써보신 적 있어요?',
      '앞으로 이런 게 더 발전하면 어떨 것 같아요?',
    ],
    tips: [
      '전문 용어는 피하고 쉬운 말로 설명하세요.',
      '"저도 잘은 모르는데"로 시작하면 부담이 줄어요.',
    ],
  },
  food: {
    starters: [
      '{topic} 보셨어요? 먹어보고 싶더라고요.',
      '요즘 {topic} 완전 유행이래요, 혹시 가보셨어요?',
      '{topic} 아세요? 요즘 SNS에서 핫하던데.',
      '요즘 {topic} 때문에 줄서는 사람이 엄청 많대요.',
    ],
    followUps: [
      '혹시 맛집 추천해줄 수 있어요?',
      '이런 종류 좋아하세요?',
      '요즘 자주 가는 카페나 맛집 있어요?',
      '직접 만들어 본 적 있어요?',
    ],
    tips: [
      '음식 이야기는 누구나 편하게 할 수 있는 최고의 소재예요.',
      '"같이 가볼까요?"로 자연스럽게 다음 약속을 잡을 수 있어요.',
      '사진을 보여주면서 얘기하면 대화가 더 풍성해져요.',
    ],
  },
  lifestyle: {
    starters: [
      '{topic} 이야기 들어보셨어요?',
      '요즘 {topic} 트렌드가 재밌더라고요.',
      '{topic} 해보신 적 있어요?',
    ],
    followUps: [
      '이런 거 관심 있으세요?',
      '저도 해볼까 하는데, 어떻게 생각하세요?',
      '주변에 해본 사람 있어요?',
    ],
    tips: [
      '라이프스타일 주제는 부담 없이 가볍게 나누기 좋아요.',
      '상대의 취향을 존중하면서 대화하세요.',
    ],
  },
  health: {
    starters: [
      '{topic} 소식 보셨어요? 건강 관련 꿀팁이에요.',
      '요즘 {topic} 하는 사람 많아졌더라고요.',
      '{topic} 해보신 적 있어요? 효과 좋대요.',
    ],
    followUps: [
      '건강 관리 어떻게 하세요?',
      '운동 루틴 같은 거 있어요?',
      '요즘 챙겨먹는 영양제 있어요?',
    ],
    tips: [
      '건강 이야기는 관심도가 높지만, 의학적 단정은 피하세요.',
      '"저도 요즘 좀 신경 쓰고 있어요"로 공감대를 형성하세요.',
    ],
  },
};

export function generateTalkSuggestion(
  title: string,
  category: NewsCategoryId
) {
  const template = talkTemplates[category] || talkTemplates.general;

  const topic = title.length > 20 ? title.substring(0, 20) + '...' : title;

  // Use title hash for consistent picks (not random each render)
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
  }
  const pick = (arr: string[]) => arr[Math.abs(hash) % arr.length];

  return {
    starter: pick(template.starters).replace('{topic}', `"${topic}"`),
    followUp: pick(template.followUps),
    tip: pick(template.tips),
  };
}
