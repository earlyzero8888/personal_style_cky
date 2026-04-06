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
                    <p className="text-xs text-red-500 font-semibold mb-2">
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
