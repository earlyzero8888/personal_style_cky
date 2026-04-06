import type { TalkTopic } from '../types';

export const talks: TalkTopic[] = [
  // === 날씨/계절 ===
  {
    id: 'weather-1',
    title: '요즘 날씨 진짜 좋지 않아요?',
    subtitle: '계절 변화를 활용한 가장 무난한 대화 시작',
    categoryId: 'weather',
    situations: ['colleague', 'stranger', 'date'],
    difficulty: 'easy',
    starterPhrases: [
      '오늘 날씨 진짜 좋지 않아요? 이런 날은 밖에 나가고 싶어지네요.',
      '요즘 날씨가 딱 좋아서 기분도 좋아지는 것 같아요.',
      '이번 주 내내 날씨가 좋다는데, 주말에 뭐 하실 계획 있으세요?',
    ],
    conversationFlows: [
      {
        starter: '요즘 날씨가 딱 좋아서 어디 나가고 싶어지지 않아요?',
        possibleResponse: '맞아요, 진짜 나들이 가기 딱 좋은 날씨예요.',
        followUp: '혹시 요즘 가본 곳 중에 좋았던 데 있어요? 저도 어디 가볼까 하는데.',
      },
      {
        starter: '오늘 아침에 나올 때 공기가 진짜 상쾌하더라고요.',
        possibleResponse: '그쵸? 아침 공기가 확실히 달라졌어요.',
        followUp: '혹시 아침에 산책이나 운동 같은 거 하세요? 이런 날씨엔 걷기만 해도 좋을 것 같아서요.',
      },
    ],
    tips: [
      '날씨 이야기는 자연스럽게 주말 계획이나 취미로 이어갈 수 있어요.',
      '단순히 "날씨 좋네요"에서 끝내지 말고, 질문을 함께 던져보세요.',
    ],
    avoidPhrases: [
      '"날씨밖에 할 말이 없네요" 같은 자조적 표현',
      '너무 길게 날씨 이야기만 하는 것',
    ],
    relatedTopicIds: ['travel-1', 'daily-1'],
  },
  {
    id: 'weather-2',
    title: '비 오는 날의 감성 토크',
    subtitle: '비 오는 날 분위기를 활용한 대화',
    categoryId: 'weather',
    situations: ['colleague', 'date', 'friend'],
    difficulty: 'easy',
    starterPhrases: [
      '비 오는 날이면 왠지 따뜻한 거 먹고 싶지 않아요?',
      '비 소리 들으면 왠지 감성적이게 되는 것 같아요.',
      '우산 안 가져오셨어요? 같이 쓰고 가실래요?',
    ],
    conversationFlows: [
      {
        starter: '비 오는 날이면 뭐가 제일 먹고 싶어요?',
        possibleResponse: '저는 파전에 막걸리요! 국룰이죠.',
        followUp: '오, 맛집 아는 데 있어요? 요즘 괜찮은 파전 집 찾고 있었는데.',
      },
    ],
    tips: [
      '비 오는 날은 음식, 카페, 감성 이야기로 자연스럽게 연결됩니다.',
      '상대가 비를 싫어할 수도 있으니 너무 "비가 좋다"만 강조하지 마세요.',
    ],
    avoidPhrases: ['출퇴근 불편하다는 불평만 늘어놓기'],
    relatedTopicIds: ['food-1', 'daily-2'],
  },

  // === 음식/맛집 ===
  {
    id: 'food-1',
    title: '점심 뭐 먹을지 고민',
    subtitle: '직장인 점심 메뉴 고민은 최고의 대화 주제',
    categoryId: 'food',
    situations: ['colleague', 'friend', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '오늘 점심 뭐 드실 거예요? 저는 매일 고민이에요.',
      '혹시 이 근처 맛집 아는 데 있어요?',
      '요즘 새로 생긴 식당 가보셨어요?',
    ],
    conversationFlows: [
      {
        starter: '오늘 점심 뭐 드실 건지 정하셨어요?',
        possibleResponse: '아직이요, 매일 뭐 먹을지가 제일 큰 고민이에요.',
        followUp: '저도요ㅋㅋ 혹시 어제 뭐 드셨어요? 겹치지 않게 해야 하니까요.',
      },
      {
        starter: '이 근처에 새로 생긴 곳 있던데, 가보셨어요?',
        possibleResponse: '어, 어디요? 저는 아직 못 가봤는데.',
        followUp: '같이 한번 가볼까요? 리뷰 보니까 괜찮아 보이던데요.',
      },
    ],
    tips: [
      '음식 이야기는 거의 모든 사람과 통하는 안전한 주제입니다.',
      '"같이 가볼까요?"로 자연스럽게 관계를 발전시킬 수 있어요.',
    ],
    avoidPhrases: [
      '상대방의 식습관이나 다이어트를 지적하는 것',
      '"그런 것도 먹어요?" 같은 취향 비하',
    ],
    relatedTopicIds: ['food-2', 'daily-1'],
  },
  {
    id: 'food-2',
    title: '요즘 빠진 음식/카페',
    subtitle: '최근 발견한 맛집이나 카페 이야기',
    categoryId: 'food',
    situations: ['date', 'friend', 'colleague'],
    difficulty: 'easy',
    starterPhrases: [
      '요즘 카페 투어 다니시는 분 계세요? 저 요즘 거기에 빠졌어요.',
      '요즘 00 음식에 꽂혔는데, 혹시 좋아하세요?',
      '최근에 가본 곳 중에 진짜 맛있었던 데가 있는데, 추천해도 돼요?',
    ],
    conversationFlows: [
      {
        starter: '혹시 카페 자주 가시는 편이에요?',
        possibleResponse: '네, 커피를 좋아해서 자주 가는 편이에요.',
        followUp: '어떤 스타일 카페를 좋아하세요? 저는 분위기 좋은 데를 좋아하는데.',
      },
    ],
    tips: [
      '상대방 취향을 먼저 물어보고, 맞춤 추천을 해주면 호감도 UP!',
      '사진을 보여주면서 이야기하면 대화가 더 풍성해져요.',
    ],
    avoidPhrases: ['가격 이야기를 너무 세세하게 하는 것'],
    relatedTopicIds: ['food-1', 'travel-1'],
  },

  // === 여행 ===
  {
    id: 'travel-1',
    title: '최근 여행 또는 여행 계획',
    subtitle: '여행은 누구나 신나는 주제',
    categoryId: 'travel',
    situations: ['date', 'friend', 'colleague', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '혹시 최근에 여행 다녀오신 곳 있어요?',
      '올해 여행 계획 세우셨어요? 저는 어디 갈지 고민 중이에요.',
      '요즘 해외여행 많이들 가시던데, 가고 싶은 나라 있어요?',
    ],
    conversationFlows: [
      {
        starter: '올해 여행 계획 있으세요?',
        possibleResponse: '일본 가려고 하는데, 아직 구체적으로 정하진 못했어요.',
        followUp: '오, 일본 어디쪽이요? 저도 가본 적 있는데, 추천해드릴 곳이 있어요!',
      },
      {
        starter: '최근에 여행 다녀오신 곳 있어요?',
        possibleResponse: '제주도 다녀왔어요, 진짜 좋았어요.',
        followUp: '제주도 어디쪽이요? 혹시 맛집 추천 좀 해주실 수 있어요?',
      },
    ],
    tips: [
      '여행 이야기는 음식, 문화, 쇼핑 등 다양한 주제로 확장하기 좋아요.',
      '상대방의 여행 경험에 진심으로 관심을 보여주세요.',
    ],
    avoidPhrases: [
      '"거기 별로던데" 같은 부정적 반응',
      '경비를 직접적으로 묻는 것',
    ],
    relatedTopicIds: ['food-2', 'weather-1'],
  },
  {
    id: 'travel-2',
    title: '버킷리스트 여행지',
    subtitle: '꿈꾸는 여행지로 설레는 대화',
    categoryId: 'travel',
    situations: ['date', 'friend'],
    difficulty: 'medium',
    starterPhrases: [
      '죽기 전에 꼭 가보고 싶은 곳이 어디예요?',
      '유럽이랑 동남아 중에 뭐가 더 끌려요?',
      '여행 가면 액티비티파예요, 힐링파예요?',
    ],
    conversationFlows: [
      {
        starter: '여행 가면 주로 뭐 하는 걸 좋아하세요? 관광? 맛집? 힐링?',
        possibleResponse: '저는 맛집 투어를 꼭 해야 해요.',
        followUp: '오, 여행 가서 먹었던 것 중에 제일 맛있었던 거 뭐예요?',
      },
    ],
    tips: [
      '꿈과 로망을 이야기하는 주제라 분위기가 밝아져요.',
      '서로의 여행 스타일을 비교하면 재미있는 대화가 됩니다.',
    ],
    avoidPhrases: ['현실적인 제약(돈, 시간)을 강조하는 것'],
    relatedTopicIds: ['travel-1', 'hobby-1'],
  },

  // === 영화/드라마 ===
  {
    id: 'entertainment-1',
    title: '요즘 볼만한 드라마/영화',
    subtitle: '콘텐츠 이야기는 공감대 형성에 최고',
    categoryId: 'entertainment',
    situations: ['colleague', 'date', 'friend', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '요즘 볼만한 드라마 있어요? 저 뭐 볼지 찾고 있거든요.',
      '혹시 넷플릭스 보세요? 요즘 뭐 보고 계세요?',
      '최근에 영화관 가보셨어요? 뭐가 재밌었어요?',
    ],
    conversationFlows: [
      {
        starter: '요즘 넷플릭스에서 뭐 보세요?',
        possibleResponse: '저 요즘 ○○ 보는데 진짜 재밌어요.',
        followUp: '오 그거 재밌다고 들었는데! 스포 없이 살짝만 알려주세요, 어떤 내용이에요?',
      },
      {
        starter: '영화 좋아하세요? 어떤 장르를 좋아하세요?',
        possibleResponse: '저는 스릴러를 좋아해요.',
        followUp: '오, 저도요! 최근에 본 스릴러 중에 추천할 만한 거 있어요?',
      },
    ],
    tips: [
      '스포일러 주의! 항상 "스포 없이" 이야기하겠다고 먼저 말해주세요.',
      '상대방이 안 본 작품이면 너무 깊게 들어가지 마세요.',
    ],
    avoidPhrases: [
      '스포일러를 불쑥 말하기',
      '"그것도 안 봤어요?" 같은 무시하는 말투',
    ],
    relatedTopicIds: ['entertainment-2', 'trend-1'],
  },
  {
    id: 'entertainment-2',
    title: '인생 영화/드라마는?',
    subtitle: '좋아하는 작품으로 서로를 알아가기',
    categoryId: 'entertainment',
    situations: ['date', 'friend'],
    difficulty: 'medium',
    starterPhrases: [
      '인생 영화가 뭐예요? 한 편만 고르라면요.',
      '어렸을 때 제일 좋아했던 영화 뭐였어요?',
      '가장 여러 번 본 드라마나 영화 있어요?',
    ],
    conversationFlows: [
      {
        starter: '인생 영화 한 편만 고르라면 뭐예요?',
        possibleResponse: '저는 ○○이요, 볼 때마다 감동이에요.',
        followUp: '와, 그 영화 저도 좋아하는데! 어떤 장면이 제일 좋았어요?',
      },
    ],
    tips: [
      '인생 영화는 그 사람의 가치관이나 감성을 엿볼 수 있는 주제예요.',
      '상대방의 선택을 존중하고 진심으로 관심을 보여주세요.',
    ],
    avoidPhrases: ['"그게 인생 영화예요?" 같은 취향 비하'],
    relatedTopicIds: ['entertainment-1', 'hobby-1'],
  },

  // === 스포츠 ===
  {
    id: 'sports-1',
    title: '요즘 스포츠 이슈',
    subtitle: '경기 결과나 선수 이야기',
    categoryId: 'sports',
    situations: ['colleague', 'friend', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '혹시 야구/축구 보세요? 어디 팬이에요?',
      '어제 경기 보셨어요? 진짜 대박이었는데!',
      '요즘 운동 하고 계신 거 있어요?',
    ],
    conversationFlows: [
      {
        starter: '혹시 스포츠 중에 즐겨 보시는 거 있어요?',
        possibleResponse: '야구요! 저 ○○ 팬이에요.',
        followUp: '오, 올시즌 성적이 어때요? 저는 잘 모르는데 한번 알려주세요!',
      },
      {
        starter: '요즘 운동 하시는 거 있어요?',
        possibleResponse: '헬스 다니고 있어요.',
        followUp: '오, 얼마나 되셨어요? 저도 시작하려고 하는데 팁 좀 주세요.',
      },
    ],
    tips: [
      '상대방이 관심 없는 스포츠를 일방적으로 이야기하지 마세요.',
      '모른다고 하면 "제가 알려드릴게요!" 식으로 자연스럽게 이어가세요.',
    ],
    avoidPhrases: [
      '상대 팀을 비하하는 발언',
      '"그 팀 팬이에요?" 같은 놀라는 반응',
    ],
    relatedTopicIds: ['hobby-1', 'daily-1'],
  },

  // === 직장생활 ===
  {
    id: 'work-1',
    title: '월요일/금요일 공감 토크',
    subtitle: '직장인이라면 공감 100% 요일 이야기',
    categoryId: 'work',
    situations: ['colleague'],
    difficulty: 'easy',
    starterPhrases: [
      '월요일은 왜 이렇게 안 가는 걸까요...',
      '금요일이다! 주말에 뭐 하실 거예요?',
      '벌써 수요일이에요, 반이나 왔네요!',
    ],
    conversationFlows: [
      {
        starter: '드디어 금요일이에요! 주말에 계획 있으세요?',
        possibleResponse: '딱히 없어요, 쉬려고요.',
        followUp: '쉬는 것도 좋죠! 저는 요즘 ○○에 빠져서 그거 하려고요. 혹시 해보신 적 있어요?',
      },
    ],
    tips: [
      '요일 공감은 가장 쉽게 시작할 수 있는 직장 스몰토크입니다.',
      '주말 계획을 물어보면 상대방의 취미를 자연스럽게 알 수 있어요.',
    ],
    avoidPhrases: [
      '업무 불만이나 상사 뒷담',
      '회사에 대한 부정적인 이야기를 너무 길게 하는 것',
    ],
    relatedTopicIds: ['daily-1', 'hobby-1'],
  },
  {
    id: 'work-2',
    title: '재택 vs 출근 이야기',
    subtitle: '요즘 핫한 근무 형태 토크',
    categoryId: 'work',
    situations: ['colleague', 'friend', 'stranger'],
    difficulty: 'medium',
    starterPhrases: [
      '혹시 재택근무 하세요? 어때요?',
      '재택이랑 출근 중에 뭐가 더 좋으세요?',
      '재택할 때 집중이 잘 되시는 편이에요?',
    ],
    conversationFlows: [
      {
        starter: '재택근무 해보신 적 있어요? 어떠셨어요?',
        possibleResponse: '해봤는데, 처음엔 좋았다가 나중엔 좀 외롭더라고요.',
        followUp: '맞아요, 사람 만나는 게 은근 중요하죠. 재택할 때 카페 가서 하시는 편이에요?',
      },
    ],
    tips: [
      '정치적이지 않으면서도 공감대를 형성하기 좋은 주제입니다.',
      '자신의 경험을 먼저 공유하면 상대도 편하게 이야기해요.',
    ],
    avoidPhrases: ['회사 정책이나 연봉에 대한 직접적인 질문'],
    relatedTopicIds: ['work-1', 'daily-2'],
  },

  // === 취미/관심사 ===
  {
    id: 'hobby-1',
    title: '요즘 빠져있는 취미',
    subtitle: '취미 이야기로 서로의 관심사 발견하기',
    categoryId: 'hobby',
    situations: ['date', 'friend', 'colleague', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '요즘 퇴근하고 뭐 하세요? 취미 같은 거 있어요?',
      '주말에 주로 뭐 하면서 보내세요?',
      '요즘 새로 시작한 거 있어요?',
    ],
    conversationFlows: [
      {
        starter: '요즘 빠져있는 취미 같은 거 있어요?',
        possibleResponse: '요즘 러닝에 빠졌어요.',
        followUp: '오, 대단하시네요! 얼마나 뛰세요? 저도 시작해볼까 하는데 초보한테 팁 좀요.',
      },
      {
        starter: '주말에 보통 뭐 하시면서 보내세요?',
        possibleResponse: '집에서 유튜브 보면서 쉬어요.',
        followUp: '유튜브 뭐 보세요? 요즘 재밌는 채널 있으면 추천해주세요!',
      },
    ],
    tips: [
      '상대방의 취미에 진심으로 관심을 보이면 대화가 자연스럽게 이어져요.',
      '"저도 해보고 싶었어요"는 마법의 한마디!',
    ],
    avoidPhrases: [
      '"그게 뭐가 재밌어요?" 같은 비하 표현',
      '자기 취미만 일방적으로 이야기하기',
    ],
    relatedTopicIds: ['sports-1', 'entertainment-1'],
  },
  {
    id: 'hobby-2',
    title: '자기계발/배움 이야기',
    subtitle: '새로 배우고 있는 것에 대한 대화',
    categoryId: 'hobby',
    situations: ['colleague', 'date', 'friend'],
    difficulty: 'medium',
    starterPhrases: [
      '요즘 뭐 배우고 있는 거 있어요?',
      '자격증 준비하시는 분 계세요?',
      '온라인 강의 듣고 계신 거 있어요?',
    ],
    conversationFlows: [
      {
        starter: '요즘 새로 배우고 있는 거 있어요?',
        possibleResponse: '영어 회화 배우고 있어요.',
        followUp: '오, 어디서 배우세요? 효과 있어요? 저도 관심 있었는데.',
      },
    ],
    tips: [
      '자기계발 이야기는 동기부여가 되면서 유익한 정보도 나눌 수 있어요.',
    ],
    avoidPhrases: ['너무 자랑처럼 들리지 않게 주의'],
    relatedTopicIds: ['hobby-1', 'work-1'],
  },

  // === 트렌드/시사 ===
  {
    id: 'trend-1',
    title: 'SNS에서 본 재밌는 것',
    subtitle: '인스타, 틱톡 등에서 본 트렌드 이야기',
    categoryId: 'trend',
    situations: ['friend', 'date', 'colleague'],
    difficulty: 'easy',
    starterPhrases: [
      '인스타에서 ○○ 보셨어요? 요즘 엄청 유행이더라고요.',
      '틱톡에서 본 건데 진짜 웃긴 거 있었어요.',
      '요즘 ○○ 챌린지 아세요?',
    ],
    conversationFlows: [
      {
        starter: 'SNS에서 뭐 재밌는 거 보신 거 있어요?',
        possibleResponse: '아, 요즘 ○○ 밈이 진짜 웃기더라고요.',
        followUp: '그거요! ㅋㅋ 저도 봤어요. 요즘 밈 보면서 스트레스 풀어요.',
      },
    ],
    tips: [
      '가벼운 트렌드 이야기는 세대 공감대를 형성하기 좋아요.',
      '상대가 SNS를 안 한다면 다른 주제로 자연스럽게 전환하세요.',
    ],
    avoidPhrases: ['정치적이거나 논쟁적인 SNS 이슈'],
    relatedTopicIds: ['humor-1', 'entertainment-1'],
  },
  {
    id: 'trend-2',
    title: '요즘 핫한 신제품/서비스',
    subtitle: 'IT, 앱, 가전 등 새로운 것들 이야기',
    categoryId: 'trend',
    situations: ['colleague', 'friend'],
    difficulty: 'medium',
    starterPhrases: [
      '혹시 새 아이폰/갤럭시 보셨어요? 바꿀까 고민 중이에요.',
      '요즘 ○○ 앱 써보셨어요? 진짜 편하더라고요.',
      'AI가 요즘 진짜 대단하지 않아요?',
    ],
    conversationFlows: [
      {
        starter: '핸드폰 뭐 쓰세요? 바꿀 때 됐는데 고민이에요.',
        possibleResponse: '저는 ○○ 쓰는데, 괜찮아요.',
        followUp: '어떤 점이 제일 좋아요? 카메라가 중요한데 어때요?',
      },
    ],
    tips: [
      '기술 이야기는 너무 전문적으로 들어가지 않는 게 좋아요.',
      '"이거 써보셨어요?"로 시작하면 자연스러워요.',
    ],
    avoidPhrases: ['특정 브랜드를 깎아내리는 발언'],
    relatedTopicIds: ['trend-1', 'hobby-2'],
  },

  // === 일상/라이프 ===
  {
    id: 'daily-1',
    title: '주말 뭐 했어요?',
    subtitle: '월요일의 필수 스몰토크',
    categoryId: 'daily',
    situations: ['colleague', 'friend', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '주말 잘 보내셨어요? 뭐 하셨어요?',
      '주말에 어디 다녀오셨어요?',
      '이번 주말은 좀 쉬셨어요?',
    ],
    conversationFlows: [
      {
        starter: '주말 잘 보내셨어요?',
        possibleResponse: '집에서 쉬었어요, 너무 피곤해서.',
        followUp: '그것도 좋죠! 푹 쉬셨으면 됐어요. 뭐 드시면서 쉬셨어요? 배달 시키셨어요?',
      },
      {
        starter: '주말에 뭐 특별한 거 하셨어요?',
        possibleResponse: '친구들이랑 브런치 먹으러 갔어요.',
        followUp: '오, 좋겠다! 어디 갔어요? 브런치 맛집 찾기가 진짜 어렵던데.',
      },
    ],
    tips: [
      '월요일 아침 가장 자연스러운 대화 주제입니다.',
      '"집에서 쉬었어요"라는 답에도 충분히 대화를 이어갈 수 있어요.',
    ],
    avoidPhrases: ['"그냥 집에만 있었어요?"라고 아쉬운 듯 반응하기'],
    relatedTopicIds: ['food-1', 'hobby-1'],
  },
  {
    id: 'daily-2',
    title: '커피/차 취향 이야기',
    subtitle: '카페인 토크로 가볍게 시작',
    categoryId: 'daily',
    situations: ['colleague', 'date', 'stranger'],
    difficulty: 'easy',
    starterPhrases: [
      '커피파예요, 차파예요?',
      '아메리카노 드세요? 저는 라떼파인데.',
      '요즘 좋아하는 카페 있어요?',
    ],
    conversationFlows: [
      {
        starter: '커피 좋아하세요? 하루에 몇 잔 드세요?',
        possibleResponse: '네, 아메리카노 하루 두 잔은 마셔요.',
        followUp: '저도요! 안 마시면 머리 아프죠ㅋㅋ 원두 맛 차이 같은 거 느끼세요?',
      },
    ],
    tips: [
      '커피 이야기는 카페 추천, 음료 취향으로 자연스럽게 확장됩니다.',
      '차를 좋아하는 사람에게는 어떤 차를 좋아하는지 물어보세요.',
    ],
    avoidPhrases: ['카페인 중독을 걱정하는 듯한 말투'],
    relatedTopicIds: ['food-2', 'daily-1'],
  },

  // === 유머/재미 ===
  {
    id: 'humor-1',
    title: '최근에 웃겼던 일',
    subtitle: '웃음은 최고의 아이스브레이커',
    categoryId: 'humor',
    situations: ['friend', 'date', 'colleague'],
    difficulty: 'easy',
    starterPhrases: [
      '최근에 진짜 웃겼던 일 있었는데, 들어볼래요?',
      '저만 웃긴 건지 모르겠는데, 이런 일이 있었어요.',
      '요즘 웃긴 영상 봤는데 공유해도 돼요?',
    ],
    conversationFlows: [
      {
        starter: '요즘 웃긴 일 없었어요?',
        possibleResponse: '아, 있었는데요! 어제 이런 일이...',
        followUp: 'ㅋㅋㅋ 진짜요? 대박! 그래서 어떻게 됐어요?',
      },
    ],
    tips: [
      '유머는 분위기를 밝게 만들지만, 상대가 불쾌할 수 있는 농담은 피하세요.',
      '자기 비하 유머를 약간 섞으면 친근해 보여요.',
    ],
    avoidPhrases: [
      '특정 집단을 비하하는 농담',
      '상대방을 놀리는 유머 (아직 친하지 않을 때)',
    ],
    relatedTopicIds: ['trend-1', 'daily-1'],
  },
  {
    id: 'humor-2',
    title: 'TMI 대결',
    subtitle: '쓸데없지만 재밌는 정보 나누기',
    categoryId: 'humor',
    situations: ['friend', 'date'],
    difficulty: 'easy',
    starterPhrases: [
      'TMI인데, 저 오늘 이런 일이 있었어요.',
      '쓸데없는 정보인데, 알고 계셨어요? ○○이래요.',
      '갑자기 궁금한 건데, ○○ 해본 적 있어요?',
    ],
    conversationFlows: [
      {
        starter: 'TMI 하나 해도 돼요?',
        possibleResponse: '네, 뭔데요? ㅋㅋ',
        followUp: '(재밌는 TMI 공유 후) 이런 거 알면 쓸데없는데 기분 좋지 않아요?ㅋㅋ',
      },
    ],
    tips: [
      'TMI는 너무 개인적인 것보다 가볍고 재밌는 것으로!',
      '서로 TMI를 주고받으면 자연스럽게 친해질 수 있어요.',
    ],
    avoidPhrases: ['정말 TMI인 개인 건강 이야기 등'],
    relatedTopicIds: ['humor-1', 'daily-1'],
  },

  // === 추가 주제들 ===
  {
    id: 'food-3',
    title: '배달 음식 추천 대결',
    subtitle: '각자의 배달 최애 메뉴 나누기',
    categoryId: 'food',
    situations: ['friend', 'colleague'],
    difficulty: 'easy',
    starterPhrases: [
      '배달 시킬 때 제일 자주 시키는 거 뭐예요?',
      '요즘 배달앱에서 새로 시켜본 거 있어요?',
      '야식으로 뭐가 제일 좋아요?',
    ],
    conversationFlows: [
      {
        starter: '배달 음식 중에 최애가 뭐예요?',
        possibleResponse: '치킨이요! 치킨은 못 참아요.',
        followUp: '어떤 치킨이요? 양념파? 후라이드파? 저는 요즘 ○○치킨에 빠졌어요.',
      },
    ],
    tips: ['배달 음식 이야기는 거의 실패하지 않는 주제입니다.'],
    avoidPhrases: ['배달비 불만만 늘어놓기'],
    relatedTopicIds: ['food-1', 'food-2'],
  },
  {
    id: 'hobby-3',
    title: '넷플릭스/유튜브 추천전',
    subtitle: '서로의 알고리즘을 엿보기',
    categoryId: 'hobby',
    situations: ['friend', 'date', 'colleague'],
    difficulty: 'easy',
    starterPhrases: [
      '유튜브 알고리즘이 요즘 뭐 추천해줘요?',
      '넷플릭스 뭐 보세요? 추천 좀 해주세요.',
      '자기 전에 유튜브 보다가 잠든 적 있죠?ㅋㅋ',
    ],
    conversationFlows: [
      {
        starter: '유튜브 알고리즘이 요즘 뭐 추천해줘요?',
        possibleResponse: '요리 영상이 계속 떠요, 저도 모르게 클릭하게 돼요.',
        followUp: '오, 보고 직접 해본 적 있어요? 저는 한번 따라 해봤는데 망했어요ㅋㅋ',
      },
    ],
    tips: [
      '유튜브 알고리즘 이야기는 상대의 관심사를 간접적으로 알 수 있어요.',
    ],
    avoidPhrases: ['특정 유튜버를 비하하는 발언'],
    relatedTopicIds: ['entertainment-1', 'humor-1'],
  },
  {
    id: 'daily-3',
    title: '수면 패턴 이야기',
    subtitle: '아침형 vs 저녁형 인간 대화',
    categoryId: 'daily',
    situations: ['friend', 'colleague', 'date'],
    difficulty: 'easy',
    starterPhrases: [
      '아침형 인간이에요, 저녁형 인간이에요?',
      '보통 몇 시에 주무세요?',
      '잠이 잘 오는 꿀팁 같은 거 있어요?',
    ],
    conversationFlows: [
      {
        starter: '아침형이에요, 저녁형이에요?',
        possibleResponse: '완전 저녁형이에요, 아침에 못 일어나요.',
        followUp: '저도요ㅋㅋ 알람 몇 개 맞추세요? 저는 5개 맞춰놓고도 힘들어요.',
      },
    ],
    tips: ['공감하기 쉬운 일상 주제라 누구와도 편하게 나눌 수 있어요.'],
    avoidPhrases: ['수면 부족으로 인한 건강 걱정 과하게 하기'],
    relatedTopicIds: ['daily-1', 'daily-2'],
  },
  {
    id: 'travel-3',
    title: '국내 숨은 명소',
    subtitle: '아는 사람만 아는 국내 여행지',
    categoryId: 'travel',
    situations: ['friend', 'colleague', 'date'],
    difficulty: 'easy',
    starterPhrases: [
      '국내에서 진짜 좋았던 곳 있어요? 숨겨진 명소 같은 거.',
      '주말에 당일치기로 갈 만한 곳 추천해주세요!',
      '서울 근교에 좋은 데 아세요?',
    ],
    conversationFlows: [
      {
        starter: '당일치기로 갈 만한 곳 있을까요?',
        possibleResponse: '양양이나 강릉은 당일치기로도 갈 만해요.',
        followUp: '오, 거기 가면 뭐가 좋아요? 맛집이나 가볼 만한 데 추천해주세요!',
      },
    ],
    tips: ['여행 이야기는 사진을 함께 보여주면 더 생생해져요.'],
    avoidPhrases: ['사람 많은 곳을 무조건 비하하기'],
    relatedTopicIds: ['travel-1', 'travel-2'],
  },
];
