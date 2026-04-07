import { useState } from 'react';
import type { GuideTopic, ConversationFlow } from '../types';

const guides: GuideTopic[] = [
  {
    id: 'g1',
    title: '처음 만난 사람과 어색함 깨기',
    subtitle: '첫 만남에서 자연스럽게 대화 시작하는 법',
    situation: '처음 만난 사람',
    difficulty: 'easy',
    starterPhrases: [
      '여기 자주 오시는 편이에요?',
      '오늘 날씨가 진짜 좋지 않아요?',
      '혹시 이쪽에서 일하세요?',
    ],
    conversationFlows: [
      {
        starter: '여기 자주 오시는 편이에요?',
        possibleResponse: '아뇨, 오늘 처음 와봤어요.',
        followUp: '저도요! 어떻게 알게 되셨어요? 저는 친구 소개로 왔어요.',
      },
    ],
    tips: [
      '가벼운 질문으로 시작하세요.',
      '공통점을 찾으면 대화가 자연스럽게 이어져요.',
      '상대 이야기에 리액션을 잘 해주세요.',
    ],
    avoidPhrases: [
      '나이, 연봉 등 개인적인 질문',
      '정치, 종교 이야기',
    ],
  },
  {
    id: 'g2',
    title: '소개팅에서 좋은 인상 남기기',
    subtitle: '부담 없이 매력적으로 대화하는 법',
    situation: '소개팅/데이트',
    difficulty: 'medium',
    starterPhrases: [
      '오시는 길은 괜찮으셨어요?',
      '주로 어떤 거 좋아하세요?',
      '요즘 재밌게 본 거 있어요?',
    ],
    conversationFlows: [
      {
        starter: '요즘 빠져있는 거 있어요? 취미라든가.',
        possibleResponse: '요즘 러닝에 빠졌어요.',
        followUp: '오, 대단하시다! 얼마나 뛰세요? 저도 시작하고 싶긴 한데 쉽지 않네요.',
      },
    ],
    tips: [
      '"나"보다 "상대" 이야기를 더 많이 들으세요.',
      '질문 → 경청 → 공감 → 내 이야기 순서가 좋아요.',
      '너무 면접처럼 질문만 하지 마세요.',
    ],
    avoidPhrases: [
      '전 애인 이야기',
      '외모 직접 평가',
      '결혼/미래 압박성 질문',
    ],
  },
  {
    id: 'g3',
    title: '회사 동료와 편하게 대화하기',
    subtitle: '매일 마주치는 동료와의 스몰토크',
    situation: '회사 동료',
    difficulty: 'easy',
    starterPhrases: [
      '주말 잘 보내셨어요?',
      '점심 뭐 드실 거예요?',
      '오늘 되게 빨리 가네요 / 안 가네요.',
    ],
    conversationFlows: [
      {
        starter: '주말에 뭐 하셨어요?',
        possibleResponse: '그냥 집에서 쉬었어요.',
        followUp: '푹 쉬셨으면 된 거죠! 뭐 맛있는 거 드셨어요?',
      },
    ],
    tips: [
      '업무 얘기보다 일상 이야기로 시작하세요.',
      '짧고 가볍게, 부담 주지 마세요.',
      '점심 메뉴는 최고의 스몰토크 소재예요.',
    ],
    avoidPhrases: [
      '상사/회사 험담',
      '연봉, 평가 이야기',
    ],
  },
  {
    id: 'g4',
    title: '대화가 끊겼을 때 살리기',
    subtitle: '어색한 침묵을 자연스럽게 넘기는 법',
    situation: '모든 상황',
    difficulty: 'medium',
    starterPhrases: [
      '아, 맞다! 이거 아세요?',
      '갑자기 생각난 건데요...',
      '그나저나 요즘 뭐 재밌는 거 없어요?',
    ],
    conversationFlows: [
      {
        starter: '아 맞다, 요즘 뭐 재밌는 거 보셨어요? 드라마나 영화.',
        possibleResponse: '음... 딱히 요즘은...',
        followUp: '저는 요즘 ○○ 봤는데 진짜 재밌더라고요. 이런 장르 좋아하세요?',
      },
    ],
    tips: [
      '"아 맞다!"는 분위기 전환의 마법 주문이에요.',
      '주변 환경(음악, 인테리어, 음식)을 소재로 활용하세요.',
      '침묵이 나쁜 건 아니에요. 자연스럽게 받아들이세요.',
    ],
    avoidPhrases: [
      '"할 말이 없네요" 같은 직접적 언급',
      '억지로 분위기 띄우려 하기',
    ],
  },
  {
    id: 'g5',
    title: '칭찬으로 호감 얻기',
    subtitle: '부담 없는 칭찬으로 분위기 좋게 만들기',
    situation: '모든 상황',
    difficulty: 'easy',
    starterPhrases: [
      '옷 스타일이 진짜 좋으시네요!',
      '목소리가 되게 편안하시다.',
      '이런 거에 되게 잘 아시네요.',
    ],
    conversationFlows: [
      {
        starter: '가방 되게 예쁘다! 어디 거예요?',
        possibleResponse: '아, 이거요? 그냥 온라인에서 샀어요.',
        followUp: '센스가 좋으시네요. 쇼핑 자주 하시는 편이에요?',
      },
    ],
    tips: [
      '외모보다는 센스, 취향, 능력을 칭찬하세요.',
      '구체적으로 칭찬하면 더 진심으로 느껴져요.',
      '칭찬 후 관련 질문을 이어가면 대화가 자연스러워요.',
    ],
    avoidPhrases: [
      '신체에 대한 직접적 언급',
      '비교하는 칭찬 ("누구보다 낫다")',
    ],
  },
  {
    id: 'g6',
    title: '어색한 상사와 자연스럽게 대화하기',
    subtitle: '격식과 친근함 사이, 적절한 거리감 잡기',
    situation: '상사/윗사람',
    difficulty: 'medium',
    starterPhrases: [
      '팀장님, 주말 잘 보내셨어요?',
      '점심 드셨어요? 오늘 구내식당 괜찮던데요.',
      '요즘 날씨가 완전 좋아졌네요, 어디 다녀오셨어요?',
      '팀장님 추천해주신 그거, 진짜 좋더라고요.',
    ],
    conversationFlows: [
      {
        starter: '팀장님, 주말에 뭐 하셨어요?',
        possibleResponse: '응, 애들이랑 공원 갔다 왔어.',
        followUp: '좋으시겠다~ 요즘 날씨도 딱인데. 어느 공원이요?',
      },
      {
        starter: '팀장님, 혹시 그 근처 맛집 아세요? 점심 고민이에요.',
        possibleResponse: '아, 뒷골목에 국밥집 괜찮아.',
        followUp: '오 진짜요? 다음에 한번 가봐야겠다. 팀장님은 뭐 드실 거예요?',
      },
      {
        starter: '이번 프로젝트 끝나면 좀 여유 되시겠어요.',
        possibleResponse: '글쎄, 바로 다음 건도 있어서...',
        followUp: '그래도 한 고비 넘긴 거잖아요. 진짜 고생 많으셨어요.',
      },
    ],
    tips: [
      '업무 얘기만 하면 더 딱딱해져요. 가벼운 일상 소재를 섞으세요.',
      '상사의 취미나 관심사를 기억해두면 대화 소재가 됩니다.',
      '엘리베이터, 복도에서 마주칠 때 한마디가 관계를 바꿔요.',
      '"팀장님 덕분에" 같은 감사 표현을 자연스럽게 섞어보세요.',
      '너무 오래 붙잡지 말고 짧게 끝내는 게 포인트예요.',
    ],
    avoidPhrases: [
      '다른 팀/상사와 비교하는 말',
      '회사 불만이나 험담 (신뢰를 잃을 수 있음)',
      '사생활을 너무 깊이 파고드는 질문',
      '"저 요즘 일이 너무 많아요" (불평으로 들릴 수 있음)',
    ],
  },
  {
    id: 'g7',
    title: '가까워지고 싶은 지인과 거리 좁히기',
    subtitle: '아는 사이인데 아직 어색한 그 관계, 한 단계 업그레이드',
    situation: '알은 척 하는 지인/동기',
    difficulty: 'medium',
    starterPhrases: [
      '오, 오랜만이다! 요즘 뭐 하고 지내?',
      '인스타 보니까 어디 다녀왔더라? 좋아보이던데!',
      '저번에 얘기했던 거 어떻게 됐어?',
      '나 요즘 이거 빠졌는데, 혹시 관심 있어?',
    ],
    conversationFlows: [
      {
        starter: '요즘 뭐 하고 지내? 바쁘지?',
        possibleResponse: '그냥 뭐 비슷비슷해~ 회사 다니고.',
        followUp: '그래도 주말엔 좀 쉬어? 나 요즘 등산 다니는데 진짜 좋더라.',
      },
      {
        starter: '인스타에 올린 그 카페 어디야? 분위기 좋아보이던데.',
        possibleResponse: '아 거기? 연남동에 새로 생긴 덴데 진짜 좋아.',
        followUp: '나도 가보고 싶다! 다음에 시간 되면 같이 가볼래?',
      },
      {
        starter: '우리 밥 한번 먹자~ 요즘 맛집 찾았는데 같이 가볼래?',
        possibleResponse: '오 좋아! 어디?',
        followUp: '○○역 근처에 파스타집인데 진짜 맛있어. 이번 주 토요일 어때?',
      },
    ],
    tips: [
      'SNS는 대화 소재의 보물창고예요. 자연스럽게 언급하세요.',
      '"다음에 밥 먹자"를 구체적 약속으로 바꿔보세요 (장소 + 날짜).',
      '상대가 올린 콘텐츠에 반응하면 관심 표현이 자연스러워요.',
      '공통 관심사를 찾으면 만남의 구실이 쉽게 생겨요.',
      '너무 급하게 친해지려 하면 부담스러워요. 자연스럽게!',
    ],
    avoidPhrases: [
      '"우리 왜 이렇게 안 만나?" (부담감 유발)',
      '갑자기 속깊은 고민 털어놓기',
      '약속 잡아놓고 취소 반복 (신뢰 하락)',
      '"너 그때 왜 연락 안 했어?" (추궁 느낌)',
    ],
  },
  {
    id: 'g8',
    title: '모임에서 잘 모르는 사람과 섞이기',
    subtitle: '단체 모임에서 혼자 겉도는 느낌 탈출하기',
    situation: '단체 모임/회식',
    difficulty: 'medium',
    starterPhrases: [
      '혹시 ○○님이랑은 어떻게 아시는 거예요?',
      '여기 음식 진짜 맛있지 않아요?',
      '저 이쪽으로 와도 될까요? 같이 앉아도 돼요?',
      '이런 모임 자주 오시는 편이에요?',
    ],
    conversationFlows: [
      {
        starter: '○○님이랑은 어떻게 아는 사이예요?',
        possibleResponse: '대학 동기예요. 같은 과였어요.',
        followUp: '아 그러시구나! 저는 회사 동료인데, 대학 때부터 알던 사이면 되게 편하시겠다.',
      },
      {
        starter: '여기 음식 뭐가 맛있어요? 추천 좀 해주세요.',
        possibleResponse: '이 집은 파전이 유명해요.',
        followUp: '오 진짜요? 시켜야겠다. 자주 오시나 봐요?',
      },
    ],
    tips: [
      '이미 둘이서 대화 중인 곳보다 혼자 있는 사람에게 먼저 말 걸어보세요.',
      '"어떻게 아시는 사이예요?"는 만능 질문이에요.',
      '음식, 장소에 대한 감상은 누구나 쉽게 답할 수 있어요.',
      '억지로 모든 사람과 친해지려 하지 않아도 돼요. 한두 명이면 충분해요.',
    ],
    avoidPhrases: [
      '한 사람만 계속 붙잡고 대화하기 (상대가 부담)',
      '남의 대화에 갑자기 끼어들기',
      '"저 아는 사람이 없어서요..." (어색함 강조)',
    ],
  },
  {
    id: 'g9',
    title: '오랜만에 연락 온 사람에게 답하기',
    subtitle: '갑자기 연락 왔을 때 당황하지 않고 대화하기',
    situation: '오래된 지인/옛 친구',
    difficulty: 'deep',
    starterPhrases: [
      '오, 오래간만이야! 잘 지내고 있어?',
      '갑자기 생각나서 연락했어~ 요즘 어때?',
      '우와 진짜 오랜만이다! 뭐 하고 지내?',
    ],
    conversationFlows: [
      {
        starter: '오랜만이야! 잘 지내지? 요즘 뭐 하고 있어?',
        possibleResponse: '어! 나 지금 ○○ 쪽에서 일하고 있어.',
        followUp: '오 대박, 거기 좋겠다. 적응은 잘 했어? 우리 시간 되면 밥 한번 먹자!',
      },
      {
        starter: 'SNS 보다가 생각나서! 요즘 되게 바빠 보이던데?',
        possibleResponse: '맞아 요즘 좀 정신없어~',
        followUp: '고생이 많다! 좀 여유 생기면 커피 한잔 하자. 하고 싶은 얘기도 있고.',
      },
    ],
    tips: [
      '과거 추억을 가볍게 언급하면 자연스럽게 분위기가 풀려요.',
      '근황 물어보되 너무 캐묻지 마세요.',
      '만남 제안은 구체적으로 하되 부담 없는 톤으로.',
      '"그때 같이 ○○ 했던 거 기억나?"는 좋은 대화 브릿지예요.',
    ],
    avoidPhrases: [
      '"야 너 왜 그동안 연락 안 했어?" (추궁)',
      '갑자기 부탁이나 돈 이야기',
      '"너 결혼했어? 애는?" (사생활 직격)',
      '과거의 안 좋은 기억 꺼내기',
    ],
  },
];

function FlowBubble({ flow }: { flow: ConversationFlow }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <div className="bg-accent text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%]">
          {flow.starter}
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-border text-text text-sm rounded-2xl rounded-bl-sm px-3.5 py-2.5 max-w-[80%]">
          {flow.possibleResponse}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-accent text-white text-sm rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%]">
          {flow.followUp}
        </div>
      </div>
    </div>
  );
}

export default function Guide() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">대화 가이드 📖</h1>
        <p className="text-sm text-text-sub mt-1">
          상황별 대화 팁과 흐름을 배워보세요
        </p>
      </div>

      <div className="space-y-3">
        {guides.map((guide) => {
          const isOpen = openId === guide.id;

          return (
            <div key={guide.id} className="bg-surface rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : guide.id)}
                className="w-full text-left p-5 bg-transparent border-none cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-semibold text-text">
                      {guide.title}
                    </p>
                    <p className="text-xs text-text-sub mt-1">
                      {guide.situation}
                    </p>
                  </div>
                  <span className="text-text-sub text-sm">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-5">
                  {/* Starter Phrases */}
                  <div>
                    <p className="text-xs text-accent font-semibold mb-2">
                      💬 추천 시작 멘트
                    </p>
                    <div className="space-y-1.5">
                      {guide.starterPhrases.map((p, i) => (
                        <p
                          key={i}
                          className="text-sm text-text bg-primary-light rounded-lg px-3 py-2"
                        >
                          "{p}"
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Conversation Flow */}
                  <div>
                    <p className="text-xs text-accent font-semibold mb-2">
                      🗣️ 대화 흐름 예시
                    </p>
                    {guide.conversationFlows.map((flow, i) => (
                      <FlowBubble key={i} flow={flow} />
                    ))}
                  </div>

                  {/* Tips */}
                  <div>
                    <p className="text-xs text-accent font-semibold mb-2">
                      ✅ 팁
                    </p>
                    {guide.tips.map((tip, i) => (
                      <p key={i} className="text-sm text-text-sub mb-1">
                        • {tip}
                      </p>
                    ))}
                  </div>

                  {/* Avoid */}
                  <div>
                    <p className="text-xs text-danger font-semibold mb-2">
                      🚫 주의
                    </p>
                    {guide.avoidPhrases.map((p, i) => (
                      <p key={i} className="text-sm text-text-sub mb-1">
                        • {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
