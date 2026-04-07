import { useState, useEffect, useMemo } from 'react';
import { stages, type ClosenessStage } from '../data/questions';

const STORAGE_KEY = 'talkmate-closer';
const DAILY_COUNT = 3;

interface CloserState {
  selectedLevel: number;
  askedIds: Record<string, boolean>; // "level-index" -> true
}

function loadState(): CloserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { selectedLevel: 1, askedIds: {} };
}

function saveState(state: CloserState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** Date-based seed for daily rotation */
function getDaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

/** Pick N daily questions from a stage, rotating by date */
function pickDaily(stage: ClosenessStage, count: number, asked: Record<string, boolean>): number[] {
  const unanswered = stage.questions
    .map((_, i) => i)
    .filter((i) => !asked[`${stage.level}-${i}`]);

  if (unanswered.length === 0) return [];

  const seed = getDaySeed() + stage.level;
  const shuffled = [...unanswered].sort((a, b) => {
    const ha = ((a + seed) * 2654435761) >>> 0;
    const hb = ((b + seed) * 2654435761) >>> 0;
    return ha - hb;
  });

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function ProgressRing({ total, done, color }: { total: number; done: number; color: string }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12">
      <svg width="48" height="48" className="rotate-[-90deg]">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#f3f4f6" strokeWidth="4" />
        <circle
          cx="24" cy="24" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-text">{pct}%</span>
    </div>
  );
}

export default function Closer() {
  const [state, setState] = useState<CloserState>(loadState);
  const [viewMode, setViewMode] = useState<'daily' | 'all'>('daily');

  useEffect(() => { saveState(state); }, [state]);

  const currentStage = stages.find((s) => s.level === state.selectedLevel) ?? stages[0];

  const askedCount = useMemo(() => {
    return currentStage.questions.reduce(
      (acc, _, i) => acc + (state.askedIds[`${currentStage.level}-${i}`] ? 1 : 0),
      0,
    );
  }, [state.askedIds, currentStage]);

  const dailyIndices = useMemo(
    () => pickDaily(currentStage, DAILY_COUNT, state.askedIds),
    [currentStage, state.askedIds],
  );

  const toggleAsked = (level: number, index: number) => {
    const key = `${level}-${index}`;
    setState((prev) => {
      const next = { ...prev, askedIds: { ...prev.askedIds } };
      if (next.askedIds[key]) {
        delete next.askedIds[key];
      } else {
        next.askedIds[key] = true;
      }
      return next;
    });
  };

  const setLevel = (level: number) => {
    setState((prev) => ({ ...prev, selectedLevel: level }));
    setViewMode('daily');
  };

  const allDone = askedCount === currentStage.questions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">친해지기 🎯</h1>
        <p className="text-sm text-text-sub mt-1">
          단계별 질문으로 자연스럽게 가까워져 보세요
        </p>
      </div>

      {/* Stage Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {stages.map((stage) => {
          const isActive = stage.level === state.selectedLevel;
          const stageAsked = stage.questions.reduce(
            (acc, _, i) => acc + (state.askedIds[`${stage.level}-${i}`] ? 1 : 0),
            0,
          );
          const stageComplete = stageAsked === stage.questions.length;

          return (
            <button
              key={stage.level}
              onClick={() => setLevel(stage.level)}
              className={`shrink-0 flex flex-col items-center gap-1 px-3.5 py-2.5 rounded-2xl border-2 transition-all bg-transparent cursor-pointer ${
                isActive
                  ? 'border-accent bg-primary-light'
                  : 'border-border'
              }`}
            >
              <span className="text-xl">{stage.emoji}</span>
              <span className={`text-xs font-semibold ${isActive ? 'text-accent' : 'text-text'}`}>
                {stage.title}
              </span>
              <span className="text-[10px] text-text-sub">
                {stageComplete ? '완료!' : `${stageAsked}/${stage.questions.length}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Current Stage Info */}
      <div className="bg-surface rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <ProgressRing
            total={currentStage.questions.length}
            done={askedCount}
            color={currentStage.color}
          />
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-text">
              {currentStage.emoji} {currentStage.title}
              <span className="text-text-sub font-normal text-xs ml-2">{currentStage.subtitle}</span>
            </p>
            <p className="text-xs text-text-sub mt-1">
              {currentStage.description}
            </p>
            <p className="text-xs mt-1.5" style={{ color: currentStage.color }}>
              {askedCount}개 완료 / {currentStage.questions.length}개 질문
            </p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('daily')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-none cursor-pointer ${
            viewMode === 'daily'
              ? 'bg-accent text-white'
              : 'bg-border text-text-sub'
          }`}
        >
          오늘의 질문
        </button>
        <button
          onClick={() => setViewMode('all')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-none cursor-pointer ${
            viewMode === 'all'
              ? 'bg-accent text-white'
              : 'bg-border text-text-sub'
          }`}
        >
          전체 보기
        </button>
      </div>

      {/* Questions */}
      {viewMode === 'daily' ? (
        <div className="space-y-3">
          {allDone ? (
            <div className="bg-surface rounded-2xl p-8 text-center">
              <p className="text-3xl mb-3">🎉</p>
              <p className="text-[15px] font-semibold text-text">
                이 단계 질문을 모두 완료했어요!
              </p>
              <p className="text-sm text-text-sub mt-1">
                다음 단계로 넘어가 볼까요?
              </p>
              {currentStage.level < 5 && (
                <button
                  onClick={() => setLevel(currentStage.level + 1)}
                  className="mt-4 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold border-none cursor-pointer"
                >
                  {stages[currentStage.level]?.emoji} {stages[currentStage.level]?.title} 단계로 →
                </button>
              )}
            </div>
          ) : dailyIndices.length === 0 ? (
            <div className="bg-surface rounded-2xl p-8 text-center">
              <p className="text-sm text-text-sub">오늘의 질문을 모두 완료했어요!</p>
              <p className="text-xs text-text-sub mt-1">내일 새로운 질문이 나타나요</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-text-sub">
                오늘 이 질문들을 시도해보세요 ✨
              </p>
              {dailyIndices.map((qIdx) => (
                <QuestionCard
                  key={qIdx}
                  question={currentStage.questions[qIdx]}
                  asked={!!state.askedIds[`${currentStage.level}-${qIdx}`]}
                  color={currentStage.color}
                  onToggle={() => toggleAsked(currentStage.level, qIdx)}
                  number={dailyIndices.indexOf(qIdx) + 1}
                />
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-text-sub">
            {currentStage.questions.length}개 질문 · 완료한 질문은 체크하세요
          </p>
          {currentStage.questions.map((q, i) => {
            const asked = !!state.askedIds[`${currentStage.level}-${i}`];
            return (
              <button
                key={i}
                onClick={() => toggleAsked(currentStage.level, i)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl transition-all border-none cursor-pointer ${
                  asked ? 'bg-border' : 'bg-surface'
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 text-[10px] transition-all ${
                    asked
                      ? 'text-white border-transparent'
                      : 'border-border text-transparent'
                  }`}
                  style={asked ? { backgroundColor: currentStage.color, borderColor: currentStage.color } : {}}
                >
                  ✓
                </span>
                <span className={`text-sm leading-relaxed ${asked ? 'text-text-sub line-through' : 'text-text'}`}>
                  {q}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  asked,
  color,
  onToggle,
  number,
}: {
  question: string;
  asked: boolean;
  color: string;
  onToggle: () => void;
  number: number;
}) {
  return (
    <div className={`bg-surface rounded-2xl p-5 transition-all ${asked ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: color }}
        >
          {number}
        </span>
        <div className="flex-1">
          <p className={`text-[15px] leading-relaxed ${asked ? 'text-text-sub line-through' : 'text-text'}`}>
            {question}
          </p>
          <button
            onClick={onToggle}
            className={`mt-3 px-4 py-2 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer ${
              asked
                ? 'bg-border text-text-sub'
                : 'text-white'
            }`}
            style={!asked ? { backgroundColor: color } : {}}
          >
            {asked ? '↩ 되돌리기' : '✓ 물어봤어요!'}
          </button>
        </div>
      </div>
    </div>
  );
}
